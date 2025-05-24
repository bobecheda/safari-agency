"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Car,
  MapPin,
  Clock,
  Star,
  Heart,
  Calendar,
  User,
  LogOut,
  Settings,
  Ticket,
  Plus,
  ArrowRight,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import axiosInstance from "@/lib/axios"
import { API_ENDPOINTS } from "@/lib/constants"
import { ApiErrorHandler } from "@/lib/error-handler"
import type { Trip, Matatu, Sacco, DashboardStats } from "@/types/dashboard"

export default function CustomerDashboard() {
  const { user, loading, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<string>("overview")
  const [favoritesSaccos, setFavoritesSaccos] = useState<Sacco[]>([])
  const [bookedTrips, setBookedTrips] = useState<Trip[]>([])
  const [availableMatatus, setAvailableMatatus] = useState<Matatu[]>([])
  const [stats, setStats] = useState<DashboardStats>({
    totalTrips: 0,
    favoriteSaccos: 0,
    tripsThisMonth: 0,
    averageRating: 0
  })
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [favoritesResponse, bookingsResponse, matatusResponse, statsResponse] = await Promise.all([
          axiosInstance.get(API_ENDPOINTS.SACCOS.LIST),
          axiosInstance.get(API_ENDPOINTS.BOOKINGS.LIST),
          axiosInstance.get(API_ENDPOINTS.MATATUS.AVAILABLE),
          axiosInstance.get(API_ENDPOINTS.AUTH.PROFILE)
        ])

        setFavoritesSaccos(favoritesResponse.data)
        setBookedTrips(bookingsResponse.data)
        setAvailableMatatus(matatusResponse.data)
        setStats(statsResponse.data.stats)
        setError('')
      } catch (err) {
        const errorResponse = ApiErrorHandler.handle(err)
        setError(errorResponse.message)
        console.error('Error fetching dashboard data:', errorResponse)
      }
    }

    if (user && !loading) {
      fetchDashboardData()
    }
  }, [user, loading])

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>
  }

  if (!user) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Please log in to view your dashboard.</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Car className="h-8 w-8 text-orange-500" />
                <span className="ml-2 text-xl font-bold text-gray-900">Safari Matatu</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" />
                <AvatarFallback className="bg-orange-500 text-white text-xl">JD</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
                <p className="text-gray-600">Ready for your next journey?</p>
              </div>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Book New Trip
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Ticket className="h-8 w-8 text-sky-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Trips</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Favorite Saccos</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-gray-900">4.8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Booked Trips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Trips
                </CardTitle>
                <CardDescription>Your confirmed and pending bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookedTrips.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No booked trips yet. Ready to plan your next journey?
                    </div>
                  ) : (
                    bookedTrips.map((trip: Trip) => (
                      <div
                        key={trip.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="bg-orange-100 p-2 rounded-lg">
                            <Car className="h-6 w-6 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{trip.route}</p>
                            <p className="text-sm text-gray-600">
                              {trip.sacco} • Seat {trip.seat}
                            </p>
                            <p className="text-sm text-gray-500">
                              {trip.date} at {trip.time}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={trip.status === "confirmed" ? "default" : trip.status === "cancelled" ? "destructive" : "secondary"}>
                            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                          </Badge>
                          <p className="text-sm font-semibold text-gray-900 mt-1">{trip.price}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Available Matatus */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Available Now
                </CardTitle>
                <CardDescription>Matatus departing soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableMatatus.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No matatus available at the moment. Please check back later.
                    </div>
                  ) : (
                    availableMatatus.map((matatu: Matatu) => (
                      <div
                        key={matatu.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="bg-sky-100 p-2 rounded-lg">
                            <MapPin className="h-6 w-6 text-sky-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{matatu.route}</p>
                            <p className="text-sm text-gray-600">{matatu.sacco}</p>
                            <p className="text-sm text-gray-500">Next: {matatu.nextDeparture}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">{matatu.price}</p>
                          <p className="text-sm text-gray-600">{matatu.availableSeats} seats left</p>
                          <Button
                            size="sm"
                            className="mt-2 bg-sky-500 hover:bg-sky-600"
                            disabled={matatu.availableSeats === 0}
                            asChild
                          >
                            <Link href={`/book-trip?matatu=${matatu.id}`}>
                              Book Now
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Favorite Saccos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  Favorite Saccos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {favoritesSaccos.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                      You haven't added any Saccos to your favorites yet.
                    </div>
                  ) : (
                    favoritesSaccos.map((sacco: Sacco) => (
                      <div key={sacco.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{sacco.name}</p>
                          <p className="text-sm text-gray-600">{sacco.route}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">{sacco.rating.toFixed(1)}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/saccos/${sacco.id}`}>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <User className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Star className="h-4 w-4 mr-2" />
                  Rate Recent Trip
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MapPin className="h-4 w-4 mr-2" />
                  Track Matatu
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Preferences
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
