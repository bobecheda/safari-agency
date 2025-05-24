export interface UserProfile {
  username: string;
  email: string;
  favourite_saccos?: string[];
}

export interface Booking {
  id: string;
  sacco: string;
  route: string;
  date: string;
  time: string;
  seat: string;
  status: string;
  price: string;
}

export interface Matatu {
  id: string;
  sacco: string;
  route: string;
  capacity: number;
  available_seats: number;
  departure_time: string;
  price: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: UserProfile;
}

export interface ApiError {
  message: string;
  status: number;
}