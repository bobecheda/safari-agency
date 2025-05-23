from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator
from django.core.validators import MaxValueValidator
from datetime import datetime
# ... imports remain unchanged ...

class User(AbstractUser):
    phone_number = models.CharField(max_length=15)
    is_sacco_admin = models.BooleanField(default=False)
    is_driver = models.BooleanField(default=False)

    def __str__(self):
        return self.username

class Route(models.Model):
    origin = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    route_name = models.CharField(max_length=100)
    highway_used = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.route_name

class Stage(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Sacco(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    services_offered = models.TextField()
    contact = models.CharField(max_length=100)
    route = models.ForeignKey(Route, on_delete=models.SET_NULL, null=True, related_name='saccos')
    stages = models.ManyToManyField(Stage, related_name='operating_saccos')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Matatu(models.Model):
    number_plate = models.CharField(max_length=20, unique=True)
    car_id = models.CharField(max_length=50, unique=True)
    seater_capacity = models.PositiveIntegerField()
    sacco = models.ForeignKey(Sacco, on_delete=models.CASCADE, related_name='matatus')
    route = models.ForeignKey(Route, on_delete=models.SET_NULL, null=True)
    is_available = models.BooleanField(default=True)
    is_insured = models.BooleanField(default=False)
    condition = models.CharField(max_length=50)
    current_stage = models.ForeignKey(Stage, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.number_plate} - {self.sacco.name}"

class Driver(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='driver_profile')
    national_id = models.CharField(max_length=20, unique=True , null=True,blank=True)
    license_number = models.CharField(max_length=20)
    sacco = models.ForeignKey(Sacco, on_delete=models.CASCADE, related_name='drivers')
    assigned_matatu = models.OneToOneField(Matatu, on_delete=models.SET_NULL, null=True, related_name='assigned_driver')
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.license_number}"

class Booking(models.Model):
    passenger = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    matatu = models.ForeignKey(Matatu, on_delete=models.CASCADE, related_name='bookings')
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    seats = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    total_fare = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=[
        ('PENDING', 'Pending'),
        ('CONFIRMED', 'Confirmed'),
        ('COMPLETED', 'Completed'),
        ('CANCELLED', 'Cancelled')
    ], default='PENDING')
    booking_date = models.DateTimeField()
    travel_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.passenger.get_full_name()} - {self.route.route_name} - {self.travel_date}"

class JourneyQueue(models.Model):
    DIRECTION_CHOICES = [
        ('TO_DESTINATION', 'Nairobi → Destination'),
        ('TO_NAIROBI', 'Destination → Nairobi')
    ]
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Completed'),
        ('CANCELLED', 'Cancelled')
    ]
    matatu = models.ForeignKey(Matatu, on_delete=models.CASCADE, related_name='journeys')
    direction = models.CharField(max_length=20, choices=DIRECTION_CHOICES)
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    queue_position = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.matatu.number_plate} - {self.direction} - {self.departure_time}"

class Seat(models.Model):
    matatu = models.ForeignKey(Matatu, on_delete=models.CASCADE, related_name='seats')
    seat_number = models.PositiveIntegerField()
    is_booked = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['matatu', 'seat_number']

    def __str__(self):
        return f"{self.matatu.number_plate} - Seat {self.seat_number}"

class Service(models.Model):
    sacco = models.ForeignKey(Sacco, on_delete=models.CASCADE, related_name='services')
    service_type = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.sacco.name} - {self.service_type}"

class Rating(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ratings')
    sacco = models.ForeignKey(Sacco, on_delete=models.CASCADE, related_name='ratings')
    stars = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer.username} - {self.sacco.name} - {self.stars} stars"

class CustomerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    favourite_saccos = models.ManyToManyField(Sacco, related_name='favourited_by')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username

class AdminProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    sacco = models.OneToOneField(Sacco, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.sacco.name} Admin"
