// src/app/models/Trip.ts
export interface Trip {
  name: string;
  image: string;
  description: string;
  price: string;
  pickupLocation: string;
  itinerary?: File;
}