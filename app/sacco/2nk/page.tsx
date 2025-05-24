"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Car, MapPin, Star, Phone, Mail, Shield, Users, ArrowLeft, Calendar, Route, CheckCircle } from "lucide-react"

export default function TwoNKSaccoPage() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const matatus = [
    {
      id: "MAT001",
      plateNumber: "KCA 123A",
      driver: "John Kamau",
      status: "active",
      nextDeparture: "6:00 AM",
      availableSeats: 8,
      rating: 4.8,
    },
    {
      id: "MAT002",
      plateNumber: "KCB 456B",
      driver: "Mary Wanjiku",
      status: "active",
      nextDeparture: "6:30 AM",
      availableSeats: 12,
      rating: 4.9,
    },
    {
      id: "MAT003",
      plateNumber: "KCC 789C",
      driver: "Peter Mwangi",
      status: "maintenance",
      nextDeparture: "N/A",
      availableSeats: 0,
      rating: 4.7,
    },
  ]

  const reviews = [
    {
      id: 1,
      customer: "Alice Njeri",
      rating: 5,
      comment: "Excellent service! Very comfortable and punctual. The driver was professional and courteous.",
      date: "2024-01-10",
      route: "Nairobi → Nyeri",
    },
    {
      id: 2,
      customer: "David Kiprotich",
      rating: 4,
      comment: "Good experience overall. Clean matatu and reasonable prices. Will use again.",
      date: "2024-01-08",
      route: "Nyeri → Nairobi",
    },
    {
      id: 3,
      customer: "Grace Wanjiku",
      rating: 5,
      comment: "Best sacco for Nairobi-Nyeri route. Always on time and very safe.",
      date: "2024-01-05",
      route: "Nairobi → Nyeri",
    },
  ]

  const schedule = [
    { time: "6:00 AM", destination: "Nyeri", price: "KSh 300", duration: "3h 30min" },
    { time: "8:00 AM", destination: "Nyeri", price: "KSh 300", duration: "3h 30min" },
    { time: "10:00 AM", destination: "Nyeri", price: "KSh 300", duration: "3h 30min" },
    { time: "12:00 PM", destination: "Nyeri", price: "KSh 300", duration: "3h 30min" },
    { time: "2:00 PM", destination: "Nyeri", price: "KSh 300", duration: "3h 30min" },
    { time: "4:00 PM", destination: "Nyeri", price: "KSh 300", duration: "3h 30min" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
              <Car className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">2NK Sacco</span>
            </div>
            <Link href="/auth">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">Book Now</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-sky-600 to-orange-500 text-white py-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('/placeholder.svg?height=600&width=1200')`,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">2NK Sacco</h1>
            <p className="text-2xl mb-2">Nairobi ↔ Nyeri</p>
            <p className="text-xl mb-8">Your trusted partner for comfortable travel</p>
            <div className="flex justify-center items-center space-x-8 mb-8">
              <div className="flex items-center">
                <Star className="h-6 w-6 text-yellow-400 fill-current mr-2" />
                <span className="text-xl font-semibold">4.8 Rating</span>
              </div>
              <div className="flex items-center">
                <Users className="h-6 w-6 mr-2" />
                <span className="text-xl font-semibold">500+ Daily Trips</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-6 w-6 mr-2" />
                <span className="text-xl font-semibold">Fully Insured</span>
              </div>
            </div>
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 text-lg">
              Book Your Journey
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: "overview", label: "Overview" },
                { id: "schedule", label: "Schedule & Pricing" },
                { id: "matatus", label: "Our Fleet" },
                { id: "reviews", label: "Reviews" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {selectedTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>About 2NK Sacco</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    2NK Sacco has been serving the Nairobi-Nyeri route for over 15 years, providing safe, comfortable,
                    and reliable transportation services. We pride ourselves on punctuality, customer service, and
                    maintaining the highest safety standards.
                  </p>
                  <p className="text-gray-600 mb-6">
                    Our fleet consists of modern, well-maintained matatus operated by experienced and licensed drivers.
                    We offer multiple daily departures to ensure you can travel at your convenience.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm">Licensed & Insured</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm">GPS Tracking</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm">Professional Drivers</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm">24/7 Support</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Route className="h-5 w-5 mr-2" />
                    Route Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Main Stops</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Nairobi CBD</span>
                        <span>→</span>
                        <span>Thika</span>
                        <span>→</span>
                        <span>Sagana</span>
                        <span>→</span>
                        <span>Karatina</span>
                        <span>→</span>
                        <span>Nyeri</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Distance</p>
                        <p className="text-sm text-gray-600">154 km</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Travel Time</p>
                        <p className="text-sm text-gray-600">3h 30min</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Fare</p>
                        <p className="text-sm text-gray-600">KSh 300</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Daily Trips</p>
                        <p className="text-sm text-gray-600">12 departures</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-orange-500 mr-3" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-gray-600">+254 700 123 456</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-orange-500 mr-3" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-gray-600">info@2nksacco.co.ke</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-orange-500 mr-3" />
                    <div>
                      <p className="font-medium">Office</p>
                      <p className="text-sm text-gray-600">Tom Mboya Street, Nairobi</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Services Offered</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Passenger Transport
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Parcel Delivery
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Group Bookings
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Airport Transfers
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {selectedTab === "schedule" && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Daily Schedule - Nairobi to Nyeri
                </CardTitle>
                <CardDescription>All times are departure times from Nairobi CBD</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {schedule.map((trip, index) => (
                    <Card key={index} className="border-2 hover:border-orange-300 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-lg font-bold text-gray-900">{trip.time}</p>
                            <p className="text-sm text-gray-600">{trip.destination}</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Available</Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600">Duration: {trip.duration}</p>
                          <p className="text-lg font-semibold text-orange-600">{trip.price}</p>
                        </div>
                        <Button size="sm" className="w-full mt-3 bg-orange-500 hover:bg-orange-600">
                          Select
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Standard Fares</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Nairobi → Nyeri</span>
                        <span className="font-semibold">KSh 300</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Nairobi → Karatina</span>
                        <span className="font-semibold">KSh 250</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Nairobi → Sagana</span>
                        <span className="font-semibold">KSh 200</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Nairobi → Thika</span>
                        <span className="font-semibold">KSh 100</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Special Offers</h4>
                    <div className="space-y-2 text-sm">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="font-medium text-green-800">Student Discount</p>
                        <p className="text-green-600">10% off with valid student ID</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="font-medium text-blue-800">Group Booking</p>
                        <p className="text-blue-600">5% off for 5+ passengers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Matatus Tab */}
        {selectedTab === "matatus" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Car className="h-5 w-5 mr-2" />
                  Our Fleet
                </CardTitle>
                <CardDescription>Modern, well-maintained vehicles for your comfort</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matatus.map((matatu) => (
                    <Card key={matatu.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="bg-orange-100 p-3 rounded-lg">
                            <Car className="h-8 w-8 text-orange-600" />
                          </div>
                          <Badge className={getStatusColor(matatu.status)}>{matatu.status}</Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{matatu.plateNumber}</h3>
                        <p className="text-sm text-gray-600 mb-3">Driver: {matatu.driver}</p>

                        {matatu.status === "active" && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Next Departure:</span>
                              <span className="font-medium">{matatu.nextDeparture}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Available Seats:</span>
                              <span className="font-medium">{matatu.availableSeats}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Rating:</span>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                                <span className="font-medium">{matatu.rating}</span>
                              </div>
                            </div>
                            <Button size="sm" className="w-full mt-3 bg-sky-500 hover:bg-sky-600">
                              Book This Matatu
                            </Button>
                          </div>
                        )}

                        {matatu.status === "maintenance" && (
                          <div className="text-center py-4">
                            <p className="text-sm text-gray-500">Currently under maintenance</p>
                            <p className="text-xs text-gray-400">Will be back in service soon</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Reviews Tab */}
        {selectedTab === "reviews" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-500" />
                  Customer Reviews
                </CardTitle>
                <CardDescription>What our customers say about their experience with 2NK Sacco</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">4.8</div>
                    <div className="flex justify-center items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">Overall Rating</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">1,247</div>
                    <p className="text-sm text-gray-600">Total Reviews</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">96%</div>
                    <p className="text-sm text-gray-600">Recommend Rate</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <Card key={review.id} className="border-l-4 border-l-orange-500">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback className="bg-orange-100 text-orange-600">
                                {review.customer
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-gray-900">{review.customer}</p>
                              <p className="text-sm text-gray-600">{review.route}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center mb-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                    Load More Reviews
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
