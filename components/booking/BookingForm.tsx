"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateBookingFormValues, createBookingSchema } from '@/lib/validators';
import { Destination } from '@/types';
import { useRouter } from 'next/navigation';
import { submitBooking } from '@/services/apiService'; 
import { useState } from 'react';

interface BookingFormProps {
  destinations: Destination[];
  initialDestinationId?: string;
}

export default function BookingForm({ destinations, initialDestinationId }: BookingFormProps) {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateBookingFormValues>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: {
      userName: '',
      email: '',
      destinationId: initialDestinationId ? parseInt(initialDestinationId) : undefined,
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Default to tomorrow
    },
  });

  const onSubmit = async (data: CreateBookingFormValues) => {
    setIsSubmitting(true);
    setApiError(null);
    try {
      const createdBookingId = await submitBooking(data);
      // console.log('Booking successful:', createdBooking);
      reset(); // Clear the form
      router.push(`/confirmation?bookingId=${createdBookingId}`);
    } catch (error: any) {
      console.error('Booking submission error:', error);
      setApiError(error.message || "Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800">Create Your Booking</h2>

      {apiError && <p className="text-red-500 text-sm text-center">{apiError}</p>}

      <div>
        <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          id="userName"
          type="text"
          {...register('userName')}
          className={`mt-1 block w-full px-3 py-2 border ${errors.userName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
        {errors.userName && <p className="mt-1 text-xs text-red-500">{errors.userName.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="destinationId" className="block text-sm font-medium text-gray-700">Destination</label>
        <select
          id="destinationId"
          {...register('destinationId')}
          className={`mt-1 block w-full px-3 py-2 border ${errors.destinationId ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        >
          <option value="">Select a destination</option>
          {destinations.map((dest) => (
            <option key={dest.id} value={dest.id}>
              {dest.name}
            </option>
          ))}
        </select>
        {errors.destinationId && <p className="mt-1 text-xs text-red-500">{errors.destinationId.message}</p>}
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Preferred Date</label>
        <input
          id="date"
          type="date"
          {...register('date')}
          min={new Date().toISOString().split("T")[0]}
          className={`mt-1 block w-full px-3 py-2 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
        {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Booking'}
      </button>
    </form>
  );
}