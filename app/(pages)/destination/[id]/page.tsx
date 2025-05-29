import { fetchDestinationById } from '@/services/apiService';
import { Destination } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation'; // For 404

interface DestinationDetailPageProps {
  params: { id: number };
}

export default async function DestinationDetailPage({ params }: DestinationDetailPageProps) {
  const { id } = params;
  let destination: Destination | null = null;
  let error: string | null = null;

  try {
    destination = await fetchDestinationById(id);
  } catch (e: any) {
    console.error(`Failed to fetch destination ${id}:`, e);
    if (e.message && e.message.toLowerCase().includes("not found")) {
        notFound(); // Trigger Next.js 404 page
    }
    error = e.message || "Could not load destination details.";
  }

  if (error) {
    return (
        <div className="text-center text-red-500 bg-red-100 p-4 rounded-md">
          <p>{error}</p>
          <Link href="/" className="text-indigo-600 hover:underline mt-2 block">Go back to homepage</Link>
        </div>
      );
  }

  if (!destination) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      {destination.imageUrl && (
        <div className="relative w-full h-64 md:h-96">
          <Image
            src={destination.imageUrl}
            alt={destination.name}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      )}
      <div className="p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">{destination.name}</h1>
        <p className="text-md text-gray-600 mb-4">
          <span className="font-semibold">Location:</span> {destination.location}
        </p>
        <div className="prose max-w-none text-gray-700 mb-6">
          <p>{destination.description}</p>
        </div>
        <Link href={`/new-booking?destinationId=${destination.id}`} className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
            Book This Destination
        </Link>
      </div>
    </div>
  );
}