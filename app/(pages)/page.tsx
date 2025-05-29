import DestinationCard from '@/components/destinations/DestinationCard';
import { fetchDestinations } from '@/services/apiService';
import { Destination } from '@/types';
import Link from 'next/link';

export default async function HomePage() {
  let destinations: Destination[] = [];
  let error: string | null = null;

  try {
    destinations = await fetchDestinations();
  } catch (e: any) {
    console.error("Failed to fetch destinations:", e);
    error = e.message || "Could not load destinations. Please try again later.";
  }

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Explore Our Destinations</h1>
        <p className="text-lg text-gray-600 mt-2">Find your next adventure with TourismPro.</p>
      </div>

      {error && (
        <div className="text-center text-red-500 bg-red-100 p-4 rounded-md mb-6">
          <p>{error}</p>
        </div>
      )}

      {destinations.length === 0 && !error && (
        <p className="text-center text-gray-500">No destinations available at the moment.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((dest) => (
          <DestinationCard key={dest.id} destination={dest} />
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/new-booking" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
            Book Now
        </Link>
      </div>
    </div>
  );
}