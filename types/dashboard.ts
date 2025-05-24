export interface Trip {
  id: string;
  route: string;
  sacco: string;
  seat: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  price: string;
}

export interface Matatu {
  id: string;
  route: string;
  sacco: string;
  nextDeparture: string;
  price: string;
  availableSeats: number;
}

export interface Sacco {
  id: string;
  name: string;
  route: string;
  rating: number;
}

export interface DashboardStats {
  totalTrips: number;
  favoriteSaccos: number;
  tripsThisMonth: number;
  averageRating: number;
}