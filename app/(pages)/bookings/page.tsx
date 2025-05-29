import BookingCard from '@/components/booking/BookingCard';
import { fetchBookings } from '@/services/apiService';
import { Booking } from '@/types';
import Link from 'next/link';

// Can be a Server Component
export default async function BookingsPage() {
  let bookings: Booking[] = [];
  let error: string | null = null;

  try {
    bookings = await fetchBookings();
  } catch (e: any) {
    console.error("Failed to fetch bookings:", e);
    error = e.message || "Could not load bookings. Please try again later.";
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">My Bookings</h1>

      {error && (
        <div className="text-center text-red-500 bg-red-100 p-4 rounded-md mb-6">
          <p>{error}</p>
        </div>
      )}

      {bookings.length === 0 && !error && (
        <div className="text-center p-10 border-2 border-dashed border-gray-300 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-500 text-lg">You have no bookings yet.</p>
          <Link href="/new-booking" legacyBehavior>
            <a className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
              Make a New Booking
            </a>
          </Link>
        </div>
      )}

      {bookings.length > 0 && (
        <div className="space-y-6">
          {bookings.map((booking) => BookingCard({booking}))}
        </div>
      )}
    </div>
  );
}