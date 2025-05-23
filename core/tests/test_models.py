from django.test import TestCase
from django.contrib.auth import get_user_model
from core.models import (
    Route, Stage, Sacco, Matatu, Driver,
    JourneyQueue, Seat, Booking, Service,
    Rating, CustomerProfile, AdminProfile
)

User = get_user_model()

class ModelTests(TestCase):
    def setUp(self):
        # Create test user
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        
        # Create test route
        self.route = Route.objects.create(
            origin='Nairobi',
            destination='Mombasa',
            route_name='NRB-MSA',
            highway_used='Mombasa Road'
        )
        
        # Create test sacco
        self.sacco = Sacco.objects.create(
            name='Test Sacco',
            description='Test Description',
            services_offered='Regular Transport',
            contact='1234567890',
            route=self.route
        )
        
        # Create test stage
        self.stage = Stage.objects.create(
            name='Test Stage',
            location='Test Location',
            sacco=self.sacco
        )
        
        # Create test matatu
        self.matatu = Matatu.objects.create(
            number_plate='KAA123A',
            car_id='TST123',
            seater_capacity=14,
            sacco=self.sacco,
            route=self.route,
            is_available=True,
            is_insured=True,
            condition='Good',
            current_stage=self.stage
        )
        
        # Create test driver
        self.driver = Driver.objects.create(
            name='Test Driver',
            phone='0712345678',
            national_id='12345678',
            sacco=self.sacco,
            assigned_matatu=self.matatu,
            salary=50000,
            is_active=True
        )

    def test_route_creation(self):
        self.assertEqual(self.route.origin, 'Nairobi')
        self.assertEqual(self.route.destination, 'Mombasa')

    def test_sacco_creation(self):
        self.assertEqual(self.sacco.name, 'Test Sacco')
        self.assertEqual(self.sacco.route, self.route)

    def test_stage_creation(self):
        self.assertEqual(self.stage.name, 'Test Stage')
        self.assertEqual(self.stage.sacco, self.sacco)

    def test_matatu_creation(self):
        self.assertEqual(self.matatu.number_plate, 'KAA123A')
        self.assertEqual(self.matatu.sacco, self.sacco)
        self.assertTrue(self.matatu.is_available)

    def test_driver_creation(self):
        self.assertEqual(self.driver.name, 'Test Driver')
        self.assertEqual(self.driver.assigned_matatu, self.matatu)
        self.assertTrue(self.driver.is_active)

    def test_journey_queue_creation(self):
        queue = JourneyQueue.objects.create(
            matatu=self.matatu,
            direction='Nairobi → Mombasa',
            departure_time='2024-01-01 08:00:00',
            arrival_time='2024-01-01 14:00:00',
            status='PENDING',
            queue_position=1
        )
        self.assertEqual(queue.matatu, self.matatu)
        self.assertEqual(queue.queue_position, 1)

    def test_seat_creation(self):
        seat = Seat.objects.create(
            matatu=self.matatu,
            seat_number='A1',
            is_booked=False
        )
        self.assertEqual(seat.matatu, self.matatu)
        self.assertFalse(seat.is_booked)

    def test_booking_creation(self):
        booking = Booking.objects.create(
            customer=self.user,
            matatu=self.matatu,
            seat_number='A1',
            travel_time='2024-01-01 08:00:00',
            status='CONFIRMED'
        )
        self.assertEqual(booking.customer, self.user)
        self.assertEqual(booking.matatu, self.matatu)

    def test_service_creation(self):
        service = Service.objects.create(
            sacco=self.sacco,
            service_type='Express',
            description='Fast Transport Service'
        )
        self.assertEqual(service.sacco, self.sacco)
        self.assertEqual(service.service_type, 'Express')

    def test_rating_creation(self):
        rating = Rating.objects.create(
            customer=self.user,
            sacco=self.sacco,
            stars=5,
            comment='Excellent service'
        )
        self.assertEqual(rating.customer, self.user)
        self.assertEqual(rating.stars, 5)

    def test_customer_profile_creation(self):
        profile = CustomerProfile.objects.create(user=self.user)
        profile.favourite_saccos.add(self.sacco)
        self.assertEqual(profile.user, self.user)
        self.assertEqual(profile.favourite_saccos.first(), self.sacco)

    def test_admin_profile_creation(self):
        admin_user = User.objects.create_user(
            username='adminuser',
            email='admin@example.com',
            password='adminpass123'
        )
        profile = AdminProfile.objects.create(
            user=admin_user,
            sacco=self.sacco
        )
        self.assertEqual(profile.user, admin_user)
        self.assertEqual(profile.sacco, self.sacco)