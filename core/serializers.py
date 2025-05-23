from rest_framework import serializers
from .models import User, Sacco, Driver, Matatu, Route, Booking

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'phone_number',
                 'is_sacco_admin', 'is_driver')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class SaccoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sacco
        fields = '__all__'

class DriverSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Driver
        fields = '__all__'

class MatatuSerializer(serializers.ModelSerializer):
    driver = DriverSerializer(read_only=True)
    class Meta:
        model = Matatu
        fields = '__all__'

class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    passenger = UserSerializer(read_only=True)
    matatu = MatatuSerializer(read_only=True)
    route = RouteSerializer(read_only=True)

    class Meta:
        model = Booking
        fields = '__all__'