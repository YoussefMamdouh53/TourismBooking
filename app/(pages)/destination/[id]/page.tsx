import { fetchDestinationById } from '@/services/apiService';
import { Destination } from '@/types';             
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation'; 


interface DestinationDetailPageProps {
  params: Promise<{id: number }>;
}

export default async function DestinationDetailPage({ params }: DestinationDetailPageProps) {
  const { id } = await params;
  let destination: Destination | null = null;
  let fetchError: string | null = null;

  try {
    destination = await fetchDestinationById(id);
  } catch (error: any) {
    console.error(`Failed to fetch destination with ID ${id}:`, error);
    if (error.message?.toLowerCase().includes("not found") || error.response?.status === 404) {
      notFound();
    }
    fetchError = error.message || "Could not load destination details at this time.";
  }

  if (fetchError && !destination) {
    return (
      <div className="text-center py-10 px-4">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Error Loading Destination</h2>
        <p className="text-red-500 bg-red-100 p-4 rounded-md">{fetchError}</p>
        <Link href="/" className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Back to Homepage
        </Link>
      </div>
    );
  }

  if (!destination) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto my-8 p-4 sm:p-6 lg:p-8 bg-white shadow-xl rounded-lg">
      {destination.imageUrl && (
        <div className="relative w-full h-64 md:h-80 lg:h-96 mb-6 rounded-lg overflow-hidden">
          <Image
            src={destination.imageUrl}
            alt={`Image of ${destination.name}`}
            layout="fill"
            objectFit="cover"
            priority // Important for LCP (Largest Contentful Paint)
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <header className="mb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
          {destination.name}
        </h1>
        <p className="text-lg sm:text-xl text-indigo-600 font-medium">
          <span className="inline-block mr-2" aria-label="Location pin">📍</span>
          {destination.location}
        </p>
      </header>

      <section className="prose prose-lg max-w-none text-gray-700 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          About {destination.name}
        </h2>
        <p>{destination.description}</p>
      </section>

      <div className="mt-8 pt-6 border-t border-gray-200 text-center sm:text-left">
        <Link
          href={`/new-booking?destinationId=${destination.id}&destinationName=${encodeURIComponent(destination.name)}`}
          className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform duration-150 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
            </svg>
            Book this Destination
        </Link>
      </div>
    </article>
  );
}