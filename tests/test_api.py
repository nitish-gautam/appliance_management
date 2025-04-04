"""
Test cases for the Appliance Management API.

This module contains tests for the following models and views:
- Property
- Appliance
- ReplacementOption
- Order

Test cases use the Django Rest Framework's APIClient for making requests.
Tests are marked with `@pytest.mark.django_db` to indicate database interactions.
"""

import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from core.models import Property, Appliance, ReplacementOption, Order


@pytest.fixture
def api_client():
    """
    Fixture for creating an instance of APIClient.

    Returns:
        APIClient: An instance of the APIClient for making HTTP requests.
    """
    return APIClient()


@pytest.mark.django_db
def test_property_list(api_client):
    """
    Test the retrieval of the property list.

    Creates two sample properties and verifies that the response contains them.
    """
    Property.objects.create(name="Sample Property 1")
    Property.objects.create(name="Sample Property 2")

    response = api_client.get(reverse("property-list"))

    assert response.status_code == 200, "Expected status code 200"
    assert len(response.data) == 2, "Expected 2 properties in the response"


@pytest.mark.django_db
def test_appliance_list(api_client):
    """
    Test the retrieval of the appliance list.

    Creates two sample appliances associated with a property and verifies that the response contains them.
    """
    # Create a sample property
    property_instance = Property.objects.create(name="Sample Property")

    # Create sample appliances linked to the property
    Appliance.objects.create(
        property=property_instance,
        name="Washing Machine",
        brand="LG",
        model_number="WM-123",
        usage="High"
    )
    Appliance.objects.create(
        property=property_instance,
        name="Refrigerator",
        brand="Samsung",
        model_number="RF-456",
        usage="Medium"
    )

    response = api_client.get(reverse("appliance-list"))

    assert response.status_code == 200, "Expected status code 200"
    assert len(response.data) == 2, "Expected 2 appliances in the response"


@pytest.mark.django_db
def test_replacement_list(api_client):
    """
    Test the retrieval of the replacement options list.

    Creates two replacement options and verifies that the response contains them.
    """
    # Create sample replacement options
    ReplacementOption.objects.create(
        name="Replacement 1",
        brand="Bosch",
        model_number="RB-123",
        price=300.0,
        efficiency="High",
        matching_score=90
    )
    ReplacementOption.objects.create(
        name="Replacement 2",
        brand="IFB",
        model_number="IFB-456",
        price=250.0,
        efficiency="Moderate",
        matching_score=80
    )

    response = api_client.get(reverse("replacement-list"))

    assert response.status_code == 200, "Expected status code 200"
    assert len(response.data) == 2, "Expected 2 replacement options in the response"


@pytest.mark.django_db
def test_create_order(api_client):
    """
    Test creating an order.

    Creates a property, appliance, and replacement option, and then verifies that an order can be created.
    """
    # Create sample data
    property_instance = Property.objects.create(name="Sample Property")
    appliance = Appliance.objects.create(
        property=property_instance,
        name="Washing Machine",
        brand="LG",
        model_number="WM-123",
        usage="High"
    )
    replacement = ReplacementOption.objects.create(
        name="Replacement 1",
        brand="Bosch",
        model_number="RB-123",
        price=300.0,
        efficiency="High",
        matching_score=90
    )

    data = {
        "property": property_instance.id,
        "appliance": appliance.id,
        "replacement": replacement.id,
        "scheduled_date": "2025-04-05",
        "scheduled_time": "10:30"
    }

    response = api_client.post(reverse("order-list"), data=data, format="json")

    assert response.status_code == 201, "Expected status code 201"
    assert response.data["property"] == property_instance.id
    assert response.data["appliance"] == appliance.id
    assert response.data["replacement"] == replacement.id


@pytest.mark.django_db
def test_order_list(api_client):
    """
    Test the retrieval of the order list.

    Creates an order and verifies that it can be retrieved.
    """
    property_instance = Property.objects.create(name="Sample Property")
    appliance = Appliance.objects.create(
        property=property_instance,
        name="Washing Machine",
        brand="LG",
        model_number="WM-123",
        usage="High"
    )
    replacement = ReplacementOption.objects.create(
        name="Replacement 1",
        brand="Bosch",
        model_number="RB-123",
        price=300.0,
        efficiency="High",
        matching_score=90
    )

    # Create an order
    Order.objects.create(
        property=property_instance,
        appliance=appliance,
        replacement=replacement,
        scheduled_date="2025-04-05",
        scheduled_time="10:30"
    )

    response = api_client.get(reverse("order-list"))

    assert response.status_code == 200, "Expected status code 200"
    assert len(response.data) == 1, "Expected 1 order in the response"


@pytest.mark.django_db
def test_order_detail(api_client):
    """
    Test retrieving an order detail.

    Creates an order and verifies that its details can be retrieved.
    """
    property_instance = Property.objects.create(name="Sample Property")
    appliance = Appliance.objects.create(
        property=property_instance,
        name="Washing Machine",
        brand="LG",
        model_number="WM-123",
        usage="High"
    )
    replacement = ReplacementOption.objects.create(
        name="Replacement 1",
        brand="Bosch",
        model_number="RB-123",
        price=300.0,
        efficiency="High",
        matching_score=90
    )

    # Create an order
    order = Order.objects.create(
        property=property_instance,
        appliance=appliance,
        replacement=replacement,
        scheduled_date="2025-04-05",
        scheduled_time="10:30"
    )

    response = api_client.get(reverse("order-detail", args=[order.id]))

    assert response.status_code == 200, "Expected status code 200"
    assert response.data["id"] == order.id