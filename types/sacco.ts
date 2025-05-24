export interface Matatu {
  id: string;
  plateNumber: string;
  driver: string;
  status: 'active' | 'maintenance' | 'inactive';
  nextDeparture: string;
  availableSeats: number;
  rating: number;
}

export interface Review {
  id: number;
  customer: string;
  rating: number;
  comment: string;
  date: string;
  route: string;
}

export interface Schedule {
  time: string;
  destination: string;
  price: string;
  duration: string;
}

export interface SaccoDetails {
  name: string;
  rating: number;
  totalReviews: number;
  routes: string[];
  contact: {
    phone: string;
    email: string;
  };
  features: string[];
}