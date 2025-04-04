from rest_framework import serializers
from .models import Property, Appliance, ReplacementOption, Order


class ReplacementOptionSerializer(serializers.ModelSerializer):
    """
    Serializer for the ReplacementOption model.
    Provides all fields available in the model.
    """

    class Meta:
        model = ReplacementOption
        fields = "__all__"


class ApplianceSerializer(serializers.ModelSerializer):
    """
    Serializer for the Appliance model.
    Provides all fields available in the model.
    """

    class Meta:
        model = Appliance
        fields = "__all__"


class PropertySerializer(serializers.ModelSerializer):
    """
    Serializer for the Property model.
    Includes nested appliance data for each property.
    """

    appliances = ApplianceSerializer(many=True, read_only=True)

    class Meta:
        model = Property
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    """
    Serializer for the Order model.
    Provides all fields available in the model.
    """

    class Meta:
        model = Order
        fields = "__all__"
