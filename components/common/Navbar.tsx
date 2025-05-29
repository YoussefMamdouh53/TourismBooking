"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href} className={`px-3 py-2 rounded-md text-sm font-medium ${
        isActive ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
      }`}>
        {children}
    </Link>
  );
};

export default function Navbar() {
  return (
    <nav className="bg-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
        <a className="text-xl font-bold text-gray-900">TourismBooking</a>
          <div className="flex space-x-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/bookings">My Bookings</NavLink>
            <NavLink href="/new-booking">New Booking</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}