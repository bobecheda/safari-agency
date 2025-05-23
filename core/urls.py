from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, SaccoViewSet, DriverViewSet,
    MatatuViewSet, RouteViewSet, BookingViewSet
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'saccos', SaccoViewSet)
router.register(r'drivers', DriverViewSet)
router.register(r'matatus', MatatuViewSet)
router.register(r'routes', RouteViewSet)
router.register(r'bookings', BookingViewSet)

urlpatterns = [
    path('', include(router.urls)),
]