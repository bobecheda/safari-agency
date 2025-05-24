"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Star, Users, Package, Car, Clock, Shield, Award } from "lucide-react"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">Safari Matatu</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("book-matatu")}
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                Book Matatu
              </button>
              <button
                onClick={() => scrollToSection("saccos")}
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                Saccos
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                Contact
              </button>
            </div>
            <Link href="/auth">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">Login / Register</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/placeholder.svg?height=1080&width=1920')`,
          }}
        />
        <div
          className={`relative z-10 text-center text-white max-w-4xl mx-auto px-4 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Explore Central Kenya in <span className="text-orange-400">Comfort</span> and{" "}
            <span className="text-sky-400">Style</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Your trusted matatu safari partner connecting Nairobi to Mt. Kenya regions
          </p>
          <div className="space-x-4">
            <Button
              onClick={() => scrollToSection("book-matatu")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg transform hover:scale-105 transition-all"
            >
              Travel Now
            </Button>
            <Button
              onClick={() => scrollToSection("about")}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg transform hover:scale-105 transition-all"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Safari Matatu</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are Central Kenya's premier matatu booking platform, connecting travelers with reliable, comfortable,
              and safe transportation across the region.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-sky-500 mx-auto mb-4" />
                <CardTitle>Safety First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All our partner matatus are fully insured and regularly inspected for your safety.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <CardTitle>Trusted Network</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We work with 6 established saccos covering all major routes in Central Kenya.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <CardTitle>Quality Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Rated 4.8/5 by thousands of satisfied customers across the region.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive travel solutions for all your needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all transform hover:-translate-y-2">
              <CardHeader>
                <Car className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                <CardTitle className="text-center">Matatu Booking</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Book your seat in advance and travel with confidence. Real-time availability and instant confirmation.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Online seat selection</li>
                  <li>• Real-time tracking</li>
                  <li>• Flexible cancellation</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-all transform hover:-translate-y-2">
              <CardHeader>
                <Package className="h-16 w-16 text-sky-500 mx-auto mb-4" />
                <CardTitle className="text-center">Parcel Delivery</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Send packages safely and affordably across Central Kenya with our trusted network.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Same-day delivery</li>
                  <li>• Package tracking</li>
                  <li>• Insurance coverage</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-all transform hover:-translate-y-2">
              <CardHeader>
                <Clock className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-center">Matatu Hire</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Hire a complete matatu for group travel, events, or special occasions.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Group discounts</li>
                  <li>• Custom routes</li>
                  <li>• Professional drivers</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Book Matatu Section */}
      <section id="book-matatu" className="py-20 bg-gradient-to-r from-sky-500 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-16">
            <h2 className="text-4xl font-bold mb-4">Book Your Journey</h2>
            <p className="text-xl">Simple, fast, and reliable booking process</p>
          </div>
          <div className="bg-white rounded-lg p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Book</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Choose Your Route</h4>
                      <p className="text-gray-600">Select from our available saccos and routes</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Pick Your Seat</h4>
                      <p className="text-gray-600">Select your preferred seat and travel time</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Confirm & Pay</h4>
                      <p className="text-gray-600">Secure payment and instant confirmation</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Sample Schedule</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded border">
                    <div>
                      <p className="font-semibold">Nairobi → Nyeri</p>
                      <p className="text-sm text-gray-600">2NK Sacco</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">KSh 300</p>
                      <p className="text-sm text-gray-600">6:00 AM</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded border">
                    <div>
                      <p className="font-semibold">Nairobi → Nanyuki</p>
                      <p className="text-sm text-gray-600">4NTE Sacco</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">KSh 350</p>
                      <p className="text-sm text-gray-600">7:30 AM</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600">
                  <Link href="/auth">Book Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Saccos Section */}
      <section id="saccos" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Partner Saccos</h2>
            <p className="text-xl text-gray-600">Trusted transportation partners across Central Kenya</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "2NK Sacco",
                route: "Nairobi → Nyeri",
                price: "From KSh 300",
                rating: 4.8,
                trips: "500+ daily trips",
                slug: "2nk",
              },
              {
                name: "4NTE Sacco",
                route: "Nairobi → Nanyuki",
                price: "From KSh 350",
                rating: 4.7,
                trips: "300+ daily trips",
                slug: "4nte",
              },
              {
                name: "Kukena Sacco",
                route: "Nairobi → Kirinyaga",
                price: "From KSh 280",
                rating: 4.9,
                trips: "400+ daily trips",
                slug: "kukena",
              },
              {
                name: "Unique Shuttle",
                route: "Nairobi → Meru",
                price: "From KSh 400",
                rating: 4.6,
                trips: "250+ daily trips",
                slug: "unique",
              },
              {
                name: "Ungwana Sacco",
                route: "Nairobi → Chuka",
                price: "From KSh 320",
                rating: 4.8,
                trips: "200+ daily trips",
                slug: "ungwana",
              },
              {
                name: "Nyena Sacco",
                route: "Nairobi → Karatina",
                price: "From KSh 290",
                rating: 4.7,
                trips: "350+ daily trips",
                slug: "nyena",
              },
            ].map((sacco, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all transform hover:-translate-y-2 cursor-pointer"
              >
                <Link href={`/sacco/${sacco.slug}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl">{sacco.name}</CardTitle>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-semibold">{sacco.rating}</span>
                      </div>
                    </div>
                    <CardDescription className="text-lg font-semibold text-orange-600">{sacco.route}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-gray-900">{sacco.price}</p>
                      <p className="text-sm text-gray-600">{sacco.trips}</p>
                      <Button className="w-full mt-4 bg-sky-500 hover:bg-sky-600">View Details</Button>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600">We're here to help with all your travel needs</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-orange-500 mr-3" />
                  <div>
                    <p className="font-semibold">Headquarters</p>
                    <p className="text-gray-600">Tom Mboya Street, Nairobi CBD</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-orange-500 mr-3" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-600">+254 700 123 456</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-orange-500 mr-3" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-600">info@safarimatatu.co.ke</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Regional Branches</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Nyeri Branch - Kimathi Way</li>
                  <li>• Nanyuki Branch - Kenyatta Avenue</li>
                  <li>• Meru Branch - Moi Avenue</li>
                </ul>
              </div>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <Input placeholder="Your Name" />
                    </div>
                    <div>
                      <Input type="email" placeholder="Your Email" />
                    </div>
                    <div>
                      <Textarea placeholder="Your Message" rows={4} />
                    </div>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Car className="h-8 w-8 text-orange-500" />
                <span className="ml-2 text-xl font-bold">Safari Matatu</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for safe and comfortable travel across Central Kenya.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => scrollToSection("about")} className="hover:text-white transition-colors">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("services")} className="hover:text-white transition-colors">
                    Services
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("saccos")} className="hover:text-white transition-colors">
                    Our Saccos
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("contact")} className="hover:text-white transition-colors">
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Matatu Booking</li>
                <li>Parcel Delivery</li>
                <li>Group Hire</li>
                <li>Route Planning</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-600 text-gray-400 hover:text-white hover:border-white"
                >
                  <span className="sr-only">Facebook</span>📘
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-600 text-gray-400 hover:text-white hover:border-white"
                >
                  <span className="sr-only">Twitter</span>🐦
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-600 text-gray-400 hover:text-white hover:border-white"
                >
                  <span className="sr-only">Instagram</span>📷
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Safari Matatu Travel Agency. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
