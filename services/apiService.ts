import axios, { AxiosError } from 'axios';
import { Destination, Booking, CreateBookingPayload, ApiError } from '../types';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Utility to handle API errors
const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const serverError = error.response?.data;
    return {
      message: serverError?.Message || serverError?.title || error.message || "An unknown API error occurred",
    };
  }
  return { message: "An unexpected error occurred" };
};


export const fetchDestinations = async (): Promise<Destination[]> => {
  try {
    const response = await apiClient.get<Destination[]>('/destination');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchDestinationById = async (id: string | number): Promise<Destination> => {
  try {
    const response = await apiClient.get<Destination>(`/destination/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const submitBooking = async (bookingData: CreateBookingPayload): Promise<Booking> => {
  try {
    const response = await apiClient.post<Booking>('/booking', bookingData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchBookings = async (): Promise<Booking[]> => {
  try {
    const response = await apiClient.get<Booking[]>('/booking');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchBookingById = async (id: string | number): Promise<Booking> => {
  try {
    const response = await apiClient.get<Booking>(`/booking/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};