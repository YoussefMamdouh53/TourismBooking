"use client"

import BookingForm from '@/components/booking/BookingForm';
import { fetchDestinations } from '@/services/apiService';
import { Destination, ApiError } from '@/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Spinner from '@/components/common/Spinner';

export default function NewBookingPage() {
  const searchParams = useSearchParams();
  const initialDestinationId = searchParams.get('destinationId') || undefined;

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const fetchedDestinations = await fetchDestinations();
        setDestinations(fetchedDestinations);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Could not load destinations.");
        setDestinations([]);
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Spinner /> <span className="ml-2">Loading booking form...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 bg-red-100 p-4 rounded-md">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="mt-2 text-indigo-600 hover:underline">Try again</button>
      </div>
    );
  }
  
  if (destinations.length === 0 && !initialDestinationId) {
     return <p className="text-center text-gray-500">No destinations available to book.</p>
  }


  return (
    <div>
      <BookingForm destinations={destinations} initialDestinationId={initialDestinationId} />
    </div>
  );
}