from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Property, Appliance, ReplacementOption, Order
from .serializers import (
    PropertySerializer,
    ApplianceSerializer,
    ReplacementOptionSerializer,
    OrderSerializer,
)


class PropertyViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Property objects.
    Supports CRUD operations using Django REST framework.
    """

    queryset = Property.objects.all()
    serializer_class = PropertySerializer


class ApplianceViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Appliance objects.
    Supports CRUD operations using Django REST framework.
    """

    queryset = Appliance.objects.all()
    serializer_class = ApplianceSerializer


class ReplacementOptionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing ReplacementOption objects.
    Supports CRUD operations using Django REST framework.
    """

    queryset = ReplacementOption.objects.all()
    serializer_class = ReplacementOptionSerializer


class OrderViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Order objects.
    Supports CRUD operations and order placement.
    """

    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    @action(detail=False, methods=["post"])
    def place_order(self, request):
        """
        Custom action to place an order.
        Expects order data in the request body.
        Returns:
            Response: Order data if successful, errors otherwise.
        """
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
