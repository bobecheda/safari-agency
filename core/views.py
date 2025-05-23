from rest_framework import viewsets, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .models import Booking, Driver, Matatu, Sacco, JourneyQueue, CustomerProfile
from .serializers import (
    BookingSerializer, DriverSerializer, MatatuSerializer,
    CustomerProfileSerializer, CustomUserSerializer
)
from .permissions import IsCustomer, IsSaccoAdmin, IsOwnerOrReadOnly

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = []

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated, IsCustomer]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Booking.objects.all()
        return Booking.objects.filter(customer=self.request.user)

class DriverViewSet(viewsets.ModelViewSet):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer
    permission_classes = [IsAuthenticated, IsSaccoAdmin]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Driver.objects.all()
        return Driver.objects.filter(sacco=self.request.user.adminprofile.sacco)

class MatatuViewSet(viewsets.ModelViewSet):
    queryset = Matatu.objects.all()
    serializer_class = MatatuSerializer
    permission_classes = [IsAuthenticated, IsSaccoAdmin]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Matatu.objects.all()
        return Matatu.objects.filter(sacco=self.request.user.adminprofile.sacco)

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = CustomerProfile.objects.all()
    serializer_class = CustomerProfileSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        if self.request.user.is_staff:
            return CustomerProfile.objects.all()
        return CustomerProfile.objects.filter(user=self.request.user)

class AvailableMatatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        available_matatus = Matatu.objects.filter(
            is_available=True,
            is_insured=True
        ).select_related('sacco', 'route', 'current_stage')
        serializer = MatatuSerializer(available_matatus, many=True)
        return Response(serializer.data)

class QueueStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        queues = JourneyQueue.objects.all().select_related(
            'matatu',
            'matatu__sacco'
        ).order_by('queue_position')
        data = [{
            'matatu': matatu.matatu.number_plate,
            'sacco': matatu.matatu.sacco.name,
            'position': matatu.queue_position,
            'status': matatu.status,
            'departure': matatu.departure_time,
            'direction': matatu.direction
        } for matatu in queues]
        return Response(data)

class SaccoDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, sacco_id):
        try:
            sacco = Sacco.objects.get(id=sacco_id)
            data = {
                'name': sacco.name,
                'description': sacco.description,
                'services': sacco.services_offered,
                'contact': sacco.contact,
                'route': sacco.route.route_name if sacco.route else None,
                'available_matatus': sacco.matatu_set.filter(
                    is_available=True
                ).count()
            }
            return Response(data)
        except Sacco.DoesNotExist:
            return Response(
                {'error': 'Sacco not found'},
                status=status.HTTP_404_NOT_FOUND
            )