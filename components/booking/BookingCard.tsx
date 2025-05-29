import { Booking } from "@/types"

interface BookingCardProps {
    booking: Booking
}

export default function BookingCard({ booking }: BookingCardProps) {
    return <div key={booking.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                <h2 className="text-xl font-semibold text-indigo-700">
                    Booking ID: {booking.id}
                </h2>
                <p className="text-sm text-gray-500">
                    Booked on: {new Date(booking.createdAt).toLocaleDateString()}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-gray-700">
                <p><strong>User:</strong> {booking.userName}</p>
                <p><strong>Email:</strong> {booking.email}</p>
                <p><strong>Destination:</strong> {booking.destinationName}</p>
                <p><strong>Travel Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
            </div>
        </div>
}