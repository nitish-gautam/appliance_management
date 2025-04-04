from django.contrib import admin
from .models import Property, Appliance, ReplacementOption, Order


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Property model.
    Displays the name, address, and shipping label in the admin list.
    """

    list_display = ("name", "address", "shipping_label")
    search_fields = ("name", "address")
    list_filter = ("address",)


@admin.register(Appliance)
class ApplianceAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Appliance model.
    Displays the name, brand, model number, usage, and associated property.
    """

    list_display = ("name", "brand", "model_number", "usage", "property")
    search_fields = ("name", "brand", "model_number")
    list_filter = ("brand", "usage", "property")


@admin.register(ReplacementOption)
class ReplacementOptionAdmin(admin.ModelAdmin):
    """
    Admin configuration for the ReplacementOption model.
    Displays the name, brand, model number, price, efficiency,
    and matching score.
    """

    list_display = (
        "name",
        "brand",
        "model_number",
        "price",
        "efficiency",
        "matching_score",
    )
    search_fields = ("name", "brand", "model_number")
    list_filter = ("brand", "efficiency")


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Order model.
    Displays the order ID, property, appliance, replacement, and created date.
    """

    list_display = (
        "id",
        "property",
        "appliance",
        "replacement",
        "scheduled_date",
        "scheduled_time",
        "created_at",
    )
    search_fields = ("property__name", "appliance__name", "replacement__name")
    list_filter = ("scheduled_date", "property", "created_at")
