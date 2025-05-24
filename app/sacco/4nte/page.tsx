"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, MapPin, Star, Phone, Mail, Shield, ArrowLeft, Calendar, Route, CheckCircle, Mountain } from "lucide-react"
import type { Matatu, Review, Schedule, SaccoDetails } from "@/types/sacco"

export default function FourNTESaccoPage() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'schedule' | 'reviews'>('overview')

  const saccoDetails: SaccoDetails = {
    name: '4NTE Sacco',
    rating: 4.7,
    totalReviews: 128,
    routes: ['Nairobi → Nanyuki', 'Nanyuki → Nairobi'],
    contact: {
      phone: '+254 712 345 678',
      email: 'info@4ntesacco.co.ke'
    },
    features: [
      'Mountain Route Specialists',
      'Professional Drivers',
      'Clean Vehicles',
      'Safe Journey Guarantee'
    ]
  }

  const matatus: Matatu[] = [
    { 
      id: 'MAT004', 
      plateNumber: 'KDA 234B', 
      driver: 'Samuel Mwangi', 
      status: 'active',
      nextDeparture: '7:30 AM',
      availableSeats: 10,
      rating: 4.7
    },
    { 
      id: 'MAT005', 
      plateNumber: 'KDB 567C', 
      driver: 'Grace Wanjiru', 
      status: 'active',
      nextDeparture: '9:00 AM',
      availableSeats: 6,
      rating: 4.8
    },
    { 
      id: 'MAT006', 
      plateNumber: 'KDC 890D', 
      driver: 'Joseph Kimani', 
      status: 'active',
      nextDeparture: '11:30 AM',
      availableSeats: 14,
      rating: 4.6
    }
  ]

  const reviews: Review[] = [
    {
      id: 1,
      customer: 'Michael Kariuki',
      rating: 5,
      comment: 'Amazing journey to Nanyuki! The matatu was comfortable and the driver very experienced with mountain roads.',
      date: '2024-01-12',
      route: 'Nairobi → Nanyuki'
    },
    {
      id: 2,
      customer: 'Sarah Muthoni',
      rating: 4,
      comment: 'Great service for visiting Mt. Kenya region. Punctual and safe. Highly recommend for tourists.',
      date: '2024-01-09',
      route: 'Nanyuki → Nairobi'
    },
    {
      id: 3,
      customer: 'James Ochieng',
      rating: 5,
      comment: 'Best sacco for Nanyuki route. Clean vehicles and professional drivers. Will use again.',
      date: '2024-01-06',
      route: 'Nairobi → Nanyuki'
    }
  ]

  const schedule: Schedule[] = [
    { time: '7:30 AM', destination: 'Nanyuki', price: 'KSh 350', duration: '4h 00min' },
    { time: '9:00 AM', destination: 'Nanyuki', price: 'KSh 350', duration: '4h 00min' },
    { time: '11:30 AM', destination: 'Nanyuki', price: 'KSh 350', duration: '4h 00min' },
    { time: '1:00 PM', destination: 'Nanyuki', price: 'KSh 350', duration: '4h 00min' },
    { time: '3:30 PM', destination: 'Nanyuki', price: 'KSh 350', duration: '4h 00min' },
    { time: '5:00 PM', destination: 'Nanyuki', price: 'KSh 350', duration: '4h 00min' }
  ]

  const getStatusColor = (status: Matatu['status']): string => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      maintenance: 'bg-yellow-100 text-yellow-800',
      inactive: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
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
              <Car className="h-8 w-8 text-sky-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">4NTE Sacco</span>
            </div>
            <Link href="/auth">
              <Button className="bg-sky-500 hover:bg-sky-600 text-white">Book Now</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-sky-600 to-green-500 text-white py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('/placeholder.svg?height=600&width=1200')`
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">4NTE Sacco</h1>
            <p className="text-2xl mb-2">Nairobi ↔ Nanyuki</p>
            <p className="text-xl mb-8">Gateway to Mt. Kenya and the Equator</p>
            <div className="flex justify-center items-center space-x-8 mb-8">
              <div className="flex items-center">
                <Star className="h-6 w-6 text-yellow-400 fill-current mr-2" />
                <span className="text-xl font-semibold">4.7 Rating</span>
              </div>
              <div className="flex items-center">
                <Mountain className="h-6 w-6 mr-2" />
                <span className="text-xl font-semibold">Mt. Kenya Route</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-6 w-6 mr-2" />
                <span className="text-xl font-semibold">Mountain Specialists</span>
              </div>
            </div>
            <Button size="lg" className="bg-white text-sky-600 hover:bg-gray-100 px-8 py-3 text-lg">
              Book Your Adventure
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
                { id: 'overview', label: 'Overview' },
                { id: 'schedule', label: 'Schedule & Pricing' },
                { id: 'matatus', label: 'Our Fleet' },
                { id: 'reviews', label: 'Reviews' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-sky-500 text-sky-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>About 4NTE Sacco</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    4NTE Sacco specializes in the Nairobi-Nanyuki route, serving as your gateway to the 
                    magnificent Mt. Kenya region. For over 12 years, we've been connecting travelers to 
                    this beautiful highland destination known for its cool climate and stunning landscapes.
                  </p>
                  <p className="text-gray-600 mb-6">
                    Our experienced drivers are well-versed with mountain roads and weather conditions, 
                    ensuring safe passage through the scenic route. We cater to both business travelers 
                    and tourists visiting the Mt. Kenya National Park and surrounding conservancies.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm">Mountain Road Experts</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm">Tourist Friendly</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm">Weather Monitoring</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm">Luggage Assistance</span>
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
                        <span>Naro Moru</span>
                        <span>→</span>
                        <span>Nanyuki</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Distance</p>
                        <p className="text-sm text-gray-600">200 km</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Travel Time</p>
                        <p className="text-sm text-gray-600">4h 00min</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Fare</p>
                        <p className="text-sm text-gray-600">KSh 350</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Daily Trips</p>
                        <p className="text-sm text-gray-600">10 departures</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-medium text-blue-900 mb-2">Special Features</h5>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Scenic mountain views throughout the journey</li>
                        <li>• Stops at the Equator crossing point</li>
                        <li>• Access to Mt. Kenya National Park</li>
                        <li>• Cool highland climate destination</li>
                      </ul>
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
                    <Phone className="h-5 w-5 text-sky-500 mr-3" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-gray-600">+254 700 234 567</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-sky-500 mr-3" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-gray-600">info@4ntesacco.co.ke</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-sky-500 mr-3" />
                    <div>
                      <p className="font-medium">Office</p>
                      <p className="text-sm text-gray-600">River Road, Nairobi</p>
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
                      Tourist Transport
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Safari Connections
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Mountain Gear Transport
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Hotel Partnerships
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mountain className="h-5 w-5 mr-2 text-green-600" />
                    Mt. Kenya Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">
                  <p className="mb-2">
                    Nanyuki is the perfect base for exploring Mt. Kenya, Africa's second-highest peak.
                  </p>
                  <ul className="space-y-1">
                    <li>• Altitude: 2,000m above sea level</li>
                    <li>• Climate: Cool and pleasant year-round</li>
                    <li>• Activities: Hiking, wildlife viewing</li>
                    <li>• Attractions: Equator crossing, conservancies</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {selectedTab === 'schedule' && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Daily Schedule - Nairobi to Nanyuki
                </CardTitle>
                <CardDescription>All times are departure times from Nairobi CBD</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {schedule.map((trip, index) => (
                    <Card key={index} className="border-2 hover:border-sky-300 transition-colors cursor-pointer">
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
                          <p className="text-lg font-semibold text-sky-600">{trip.price}</p>
                        </div>
                        <Button size="sm" className="w-full mt-3 bg-sky-500 hover:bg-sky-600">
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
                        <span>Nairobi → Nanyuki</span>
                        <span className="font-semibold">KSh 350</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Nairobi → Naro Moru</span>
                        <span className="font-semibold">KSh 320</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Nairobi → Karatina</span>
                        <span className="font-semibold">KSh 250</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Nairobi → Sagana</span>
                        <span className="font-semibold">KSh 200</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Tourist Packages</h4>
                    <div className="space-y-2 text-sm">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="font-medium text-green-800">Safari Package</p>
                        <p className="text-green-600">Round trip + conservancy access</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="font-medium text-blue-800">Mt. Kenya Package</p>
                        <p className="text-blue-600">Transport + park gate transfer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Matatus Tab */}
        {selectedTab === 'matatus' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Car className="h-5 w-5 mr-2" />
                  Our Mountain Fleet
                </CardTitle>
                <CardDescription>Specially equipped vehicles for highland travel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matatus.map((matatu) => (
                    <Card key={matatu.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="bg-sky-100 p-3 rounded-lg">
                            <Car className="h-8 w-8 text-sky-600" />
                          </div>
                          <Badge className={getStatusColor(matatu.status)}>
                            {matatu.status}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{matatu.plateNumber}</h3>
                        <p className="text-sm text-gray-600 mb-3">Driver: {matatu.driver}</p>
                        
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
                              <span className="font-medium\
