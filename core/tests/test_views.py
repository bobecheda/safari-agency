from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth import get_user_model
from core.models import (
    Route, Sacco, Matatu, Driver,
    JourneyQueue, Booking, CustomerProfile
)

User = get_user_model()

class ViewTests(APITestCase):
    def setUp(self):
        # Create test users
        self.customer = User.objects.create_user(
            username='customer',
            email='customer@example.com',
            password='customer123'
        )
        self.admin_user = User.objects.create_user(
            username='admin',
            email='admin@example.com',
            password='admin123',
            is_staff=True
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
        
        # Create test matatu
        self.matatu = Matatu.objects.create(
            number_plate='KAA123A',
            car_id='TST123',
            seater_capacity=14,
            sacco=self.sacco,
            route=self.route,
            is_available=True,
            is_insured=True,
            condition='Good'
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
        
        # Create customer profile
        self.customer_profile = CustomerProfile.objects.create(
            user=self.customer
        )
        
        # Setup client
        self.client = APIClient()

    def test_register_user(self):
        url = reverse('register')
        data = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'newpass123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_booking_list(self):
        self.client.force_authenticate(user=self.customer)
        url = reverse('booking-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_booking(self):
        self.client.force_authenticate(user=self.customer)
        url = reverse('booking-list')
        data = {
            'matatu': self.matatu.id,
            'seat_number': 'A1',
            'travel_time': '2024-01-01T08:00:00Z',
            'status': 'PENDING'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_available_matatus(self):
        self.client.force_authenticate(user=self.customer)
        url = reverse('available-matatus')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)

    def test_queue_status(self):
        self.client.force_authenticate(user=self.customer)
        # Create a test queue
        JourneyQueue.objects.create(
            matatu=self.matatu,
            direction='Nairobi → Mombasa',
            departure_time='2024-01-01T08:00:00Z',
            arrival_time='2024-01-01T14:00:00Z',
            status='PENDING',
            queue_position=1
        )
        url = reverse('queue-status')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)

    def test_sacco_detail(self):
        self.client.force_authenticate(user=self.customer)
        url = reverse('sacco-detail', kwargs={'sacco_id': self.sacco.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Test Sacco')

    def test_driver_list_admin_access(self):
        self.client.force_authenticate(user=self.admin_user)
        url = reverse('driver-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_driver_list_customer_access_denied(self):
        self.client.force_authenticate(user=self.customer)
        url = reverse('driver-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_matatu_list(self):
        self.client.force_authenticate(user=self.customer)
        url = reverse('matatu-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_customer_profile(self):
        self.client.force_authenticate(user=self.customer)
        url = reverse('customerprofile-detail', kwargs={'pk': self.customer_profile.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)