import Link from 'next/link';
import Image from 'next/image';
import { Destination } from '@/types';

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link href={`/destination/${destination.id}`} className="block border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative w-full h-48">
            <Image
            src={destination.imageUrl || '/placeholder-image.jpg'} // Provide a placeholder
            alt={destination.name}
            layout="fill"
            objectFit="cover"
            priority={destination.id <= 3} // Prioritize images for first few cards (LCP)
            />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-1">{destination.name}</h3>
          <p className="text-gray-600 text-sm">{destination.location}</p>
        </div>
    </Link>
  );
}