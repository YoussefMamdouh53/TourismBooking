import { z } from 'zod';

export const createBookingSchema = z.object({
  userName: z.string().min(2, "Name must be at least 2 characters long.").max(100),
  email: z.string().email("Invalid email address.").max(100),
  destinationId: z.coerce.number().positive("Please select a destination."),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format.",
  }).refine((date) => new Date(date) >= new Date(new Date().setHours(0,0,0,0)), { // Compare dates only
    message: "Booking date cannot be in the past.",
  }),
});

export type CreateBookingFormValues = z.infer<typeof createBookingSchema>;