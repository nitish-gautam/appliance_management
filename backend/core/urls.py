from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PropertyViewSet,
    ApplianceViewSet,
    ReplacementOptionViewSet,
    OrderViewSet,
)

# Initialize the default router for automatic URL routing
router = DefaultRouter()

# Register the viewsets with the router
router.register(r"properties", PropertyViewSet, basename="property")
router.register(r"appliances", ApplianceViewSet, basename="appliance")
router.register(
    r"replacements", ReplacementOptionViewSet, basename="replacement"
)
router.register(r"orders", OrderViewSet, basename="order")

urlpatterns = [
    # Include all automatically generated router URLs
    path("", include(router.urls)),
]
