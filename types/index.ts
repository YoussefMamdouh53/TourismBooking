export interface Destination {
  id: number;
  name: string;
  description: string;
  location: string;
  imageUrl?: string;
}

export interface Booking {
  id: number;
  userName: string;
  email: string;
  destinationId: number;
  destinationName?: string; // Populated by backend service
  date: string; // ISO string date
  createdAt: string; // ISO string date
}

export interface CreateBookingPayload {
  userName: string;
  email: string;
  destinationId: number;
  date: string; // YYYY-MM-DD format
}

export interface ApiError {
  message: string;
}