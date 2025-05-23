from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator

class User(AbstractUser):
    phone_number = models.CharField(max_length=15)
    is_sacco_admin = models.BooleanField(default=False)
    is_driver = models.BooleanField(default=False)

    def __str__(self):
        return self.username

class Sacco(models.Model):
    name = models.CharField(max_length=100)
    registration_number = models.CharField(max_length=50, unique=True)
    address = models.CharField(max_length=200)
    contact_person = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='managed_sacco')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Driver(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    sacco = models.ForeignKey(Sacco, on_delete=models.CASCADE, related_name='drivers')
    license_number = models.CharField(max_length=50, unique=True)
    experience_years = models.PositiveIntegerField()
    status = models.CharField(max_length=20, choices=[
        ('ACTIVE', 'Active'),
        ('INACTIVE', 'Inactive'),
        ('ON_TRIP', 'On Trip')
    ], default='ACTIVE')

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.license_number}"

class Matatu(models.Model):
    sacco = models.ForeignKey(Sacco, on_delete=models.CASCADE, related_name='matatus')
    plate_number = models.CharField(max_length=20, unique=True)
    capacity = models.PositiveIntegerField()
    driver = models.ForeignKey(Driver, on_delete=models.SET_NULL, null=True, related_name='assigned_matatu')
    status = models.CharField(max_length=20, choices=[
        ('AVAILABLE', 'Available'),
        ('IN_TRANSIT', 'In Transit'),
        ('MAINTENANCE', 'Under Maintenance')
    ], default='AVAILABLE')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.plate_number} - {self.sacco.name}"

class Route(models.Model):
    name = models.CharField(max_length=100)
    start_location = models.CharField(max_length=100)
    end_location = models.CharField(max_length=100)
    distance = models.DecimalField(max_digits=10, decimal_places=2)
    base_fare = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.start_location} to {self.end_location}"

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
        return f"{self.passenger.get_full_name()} - {self.route.name} - {self.travel_date}"