from django.db import models


class Property(models.Model):
    """
    Represents a property that contains various appliances.

    Attributes:
        name (str): The name of the property
            (e.g., "Blackhorse Mills / Flat #101").
        address (str, optional): The address of the property
            (e.g., "123 Main Street").
        shipping_label (ImageField, optional): An image field for the shipping
        label.
    """

    name = models.CharField(max_length=200)
    address = models.CharField(max_length=300, blank=True, null=True)
    shipping_label = models.ImageField(
        upload_to="shipping_labels/", blank=True, null=True
    )

    def __str__(self):
        """
        Returns a human-readable representation of the property.

        Returns:
            str: The name of the property.
        """
        return self.name


class Appliance(models.Model):
    """
    Represents an appliance associated with a property.

    Attributes:
        property (ForeignKey): The related property object.
        name (str): The appliance name (e.g., "Washing Machine").
        brand (str): The brand of the appliance (e.g., "Bosch").
        model_number (str): The model number of the appliance.
        usage (str, optional): The usage intensity (e.g., "High").
        image (ImageField, optional): An image representing the appliance.
    """

    property = models.ForeignKey(
        Property, on_delete=models.CASCADE, related_name="appliances"
    )
    name = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    model_number = models.CharField(max_length=100)
    usage = models.CharField(max_length=50, blank=True, null=True)
    image = models.ImageField(
        upload_to="appliance_images/", blank=True, null=True
    )

    def __str__(self):
        """
        Returns a human-readable representation of the appliance.

        Returns:
            str: The formatted appliance name with brand and model.
        """
        return f"{self.name} ({self.brand} - {self.model_number})"


class ReplacementOption(models.Model):
    """
    Represents a recommended replacement option for an appliance.

    Attributes:
        name (str): The appliance name (e.g., "Washing Machine").
        brand (str): The brand of the replacement appliance.
        model_number (str): The model number of the replacement appliance.
        price (Decimal): The price of the replacement appliance.
        efficiency (str, optional): The efficiency rating of the appliance.
        matching_score (int): A score indicating how well the replacement
        matches.
    """

    name = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    model_number = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    efficiency = models.CharField(max_length=100, blank=True, null=True)
    matching_score = models.PositiveIntegerField(default=0)

    def __str__(self):
        """
        Returns a human-readable representation of the replacement option.

        Returns:
            str: The formatted brand and model number.
        """
        return f"{self.brand} - {self.model_number}"


class Order(models.Model):
    """
    Represents an order placed for a replacement appliance.

    Attributes:
        property (ForeignKey): The related property object.
        appliance (ForeignKey): The appliance being replaced.
        replacement (ForeignKey): The replacement option chosen.
        scheduled_date (DateField, optional): The date for delivery.
        scheduled_time (TimeField, optional): The time for delivery.
        created_at (DateTimeField): Timestamp of order creation.
    """

    property = models.ForeignKey(
        Property, on_delete=models.CASCADE, related_name="orders"
    )
    appliance = models.ForeignKey(
        Appliance, on_delete=models.CASCADE, related_name="orders"
    )
    replacement = models.ForeignKey(
        ReplacementOption, on_delete=models.CASCADE, related_name="orders"
    )
    scheduled_date = models.DateField(null=True, blank=True)
    scheduled_time = models.TimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        """
        Returns a human-readable representation of the order.

        Returns:
            str: The formatted order ID and replacement details.
        """
        return f"Order #{self.id} - {self.replacement}"
