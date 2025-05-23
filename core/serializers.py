from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    Route, Stage, Sacco, Matatu, Driver, JourneyQueue,
    Seat, Booking, Service, Rating, CustomerProfile, AdminProfile
)

User = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name',
                 'phone_number', 'is_sacco_admin', 'is_driver')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ('id', 'origin', 'destination', 'route_name', 'highway_used',
                 'created_at', 'updated_at')

class StageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stage
        fields = ('id', 'name', 'location', 'sacco', 'created_at', 'updated_at')

class SaccoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sacco
        fields = ('id', 'name', 'description', 'services_offered', 'contact',
                 'route', 'stages', 'created_at', 'updated_at')

class MatatuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matatu
        fields = ('id', 'number_plate', 'car_id', 'seater_capacity', 'sacco',
                 'route', 'is_available', 'is_insured', 'condition',
                 'current_stage', 'created_at', 'updated_at')

class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = ('id', 'name', 'phone', 'national_id', 'sacco',
                 'assigned_matatu', 'salary', 'is_active', 'created_at',
                 'updated_at')

class JourneyQueueSerializer(serializers.ModelSerializer):
    class Meta:
        model = JourneyQueue
        fields = ('id', 'matatu', 'direction', 'departure_time', 'arrival_time',
                 'status', 'queue_position', 'created_at', 'updated_at')

class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ('id', 'matatu', 'seat_number', 'is_booked', 'created_at',
                 'updated_at')

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('id', 'passenger', 'matatu', 'route', 'seats', 'total_fare',
                 'status', 'booking_date', 'travel_date', 'created_at',
                 'updated_at')

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ('id', 'sacco', 'service_type', 'description', 'created_at',
                 'updated_at')

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('id', 'customer', 'sacco', 'stars', 'comment', 'created_at')

class CustomerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerProfile
        fields = ('id', 'user', 'favourite_saccos', 'created_at', 'updated_at')

class AdminProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminProfile
        fields = ('id', 'user', 'sacco', 'created_at', 'updated_at')