"use client"; // To read searchParams

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchBookingById } from '@/services/apiService';
import { Booking, ApiError } from '@/types';
import Spinner from '@/components/common/Spinner';


export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const [bookingDetails, setBookingDetails] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (bookingId) {
      const loadBookingDetails = async () => {
        try {
          setLoading(true);
          const details = await fetchBookingById(bookingId);
          setBookingDetails(details);
          setError(null);
        } catch (err: any) {
          setError(err.message || "Could not fetch booking details.");
          console.error("Failed to fetch booking details:", err);
        } finally {
          setLoading(false);
        }
      };
      loadBookingDetails();
    } else {
      setLoading(false);
      // setError("No booking ID provided."); // Or handle as a generic success message
    }
  }, [bookingId]);


  if (loading) {
    return (
      <div className="text-center py-10">
        <Spinner />
        <p className="mt-2">Loading confirmation...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-green-50 shadow-lg rounded-lg text-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h1 className="text-3xl font-bold text-green-700 mb-3">Booking Confirmed!</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {bookingId && !bookingDetails && !error && (
         <p className="text-gray-700 mb-4">Your booking request (ID: <strong>{bookingId}</strong>) has been successfully submitted.</p>
      )}

      {bookingDetails && (
        <div className="text-left bg-white p-6 rounded-md shadow my-6 border border-green-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Your Booking Details:</h2>
          <p><strong>Booking ID:</strong> {bookingDetails.id}</p>
          <p><strong>Name:</strong> {bookingDetails.userName}</p>
          <p><strong>Email:</strong> {bookingDetails.email}</p>
          <p><strong>Destination:</strong> {bookingDetails.destinationName}</p>
          <p><strong>Date:</strong> {new Date(bookingDetails.date).toLocaleDateString()}</p>
          <p><strong>Booked On:</strong> {new Date(bookingDetails.createdAt).toLocaleString()}</p>
        </div>
      )}
      
      <p className="text-gray-600 mb-6">We have sent a confirmation to your email address (if applicable). Please check your inbox and spam folder.</p>
      
      <div className="space-x-4">
        <Link href="/" legacyBehavior>
          <a className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
            Back to Home
          </a>
        </Link>
        <Link href="/bookings" legacyBehavior>
          <a className="inline-block bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
            View My Bookings
          </a>
        </Link>
      </div>
    </div>
  );
}