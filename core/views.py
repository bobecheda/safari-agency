from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .models import User, Sacco, Driver, Matatu, Route, Booking
from .serializers import (
    UserSerializer, SaccoSerializer, DriverSerializer,
    MatatuSerializer, RouteSerializer, BookingSerializer
)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return User.objects.all()
        return User.objects.filter(id=self.request.user.id)

class SaccoViewSet(viewsets.ModelViewSet):
    queryset = Sacco.objects.all()
    serializer_class = SaccoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff or self.request.user.is_sacco_admin:
            return Sacco.objects.all()
        return Sacco.objects.filter(contact_person=self.request.user)

class DriverViewSet(viewsets.ModelViewSet):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Driver.objects.all()
        if self.request.user.is_sacco_admin:
            return Driver.objects.filter(sacco__contact_person=self.request.user)
        return Driver.objects.filter(user=self.request.user)

class MatatuViewSet(viewsets.ModelViewSet):
    queryset = Matatu.objects.all()
    serializer_class = MatatuSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Matatu.objects.all()
        if self.request.user.is_sacco_admin:
            return Matatu.objects.filter(sacco__contact_person=self.request.user)
        if self.request.user.is_driver:
            return Matatu.objects.filter(driver__user=self.request.user)
        return Matatu.objects.filter(status='AVAILABLE')

    @action(detail=True, methods=['post'])
    def assign_driver(self, request, pk=None):
        matatu = self.get_object()
        driver_id = request.data.get('driver_id')
        
        if not driver_id:
            return Response({'error': 'Driver ID is required'}, status=status.HTTP_400_BAD_REQUEST)
            
        driver = get_object_or_404(Driver, id=driver_id)
        
        if driver.status != 'ACTIVE':
            return Response({'error': 'Driver is not active'}, status=status.HTTP_400_BAD_REQUEST)
            
        matatu.driver = driver
        matatu.save()
        
        return Response(MatatuSerializer(matatu).data)

class RouteViewSet(viewsets.ModelViewSet):
    queryset = Route.objects.all()
    serializer_class = RouteSerializer
    permission_classes = [permissions.IsAuthenticated]

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Booking.objects.all()
        if self.request.user.is_sacco_admin:
            return Booking.objects.filter(matatu__sacco__contact_person=self.request.user)
        if self.request.user.is_driver:
            return Booking.objects.filter(matatu__driver__user=self.request.user)
        return Booking.objects.filter(passenger=self.request.user)

    def perform_create(self, serializer):
        serializer.save(passenger=self.request.user)

    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        booking = self.get_object()
        status = request.data.get('status')
        
        if not status or status not in ['CONFIRMED', 'COMPLETED', 'CANCELLED']:
            return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)
            
        booking.status = status
        booking.save()
        
        return Response(BookingSerializer(booking).data)