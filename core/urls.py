from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RegisterView, BookingViewSet, DriverViewSet,
    MatatuViewSet, CustomerViewSet, AvailableMatatusView,
    QueueStatusView, SaccoDetailView
)

router = DefaultRouter()
router.register(r'bookings', BookingViewSet)
router.register(r'drivers', DriverViewSet)
router.register(r'matatus', MatatuViewSet)
router.register(r'customers', CustomerViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('available-matatus/', AvailableMatatusView.as_view(), name='available-matatus'),
    path('queue-status/', QueueStatusView.as_view(), name='queue-status'),
    path('sacco/<int:sacco_id>/', SaccoDetailView.as_view(), name='sacco-detail'),
]