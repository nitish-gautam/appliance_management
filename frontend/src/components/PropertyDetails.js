// Import necessary libraries
import React from 'react';

/**
 * PropertyDetails Component
 * Renders detailed information about a property, including:
 * - Property name
 * - Appliance details (if available)
 * - Shipping label image (or placeholder if not available)
 * 
 * @param {Object} props - Component properties
 * @param {Object} props.property - The property object containing name, appliances, and shipping label
 * @returns {JSX.Element|null} - The rendered property details or null if no property data is provided
 */
function PropertyDetails({ property }) {
  // Return null if no property data is available
  if (!property) return null;

  // Extract the first appliance from the property's appliance list (if exists)
  const appliance = property?.appliances?.[0];

  return (
    <div className="property-card">
      <div className="property-info">
        {/* Display the property name */}
        <h4>{property.name}</h4>

        {/* Display appliance details if an appliance exists */}
        {appliance && (
          <div className="property-meta">
            <span>
              <strong>Brand:</strong> {appliance.brand}
            </span>
            <span>
              <strong>Model:</strong> {appliance.model_number}
            </span>
            <span>
              <strong>Usage:</strong> {appliance.usage}
            </span>
          </div>
        )}
      </div>

      {/* Display the shipping label or a placeholder if not available */}
      <div className="barcode-section">
        {property.shipping_label ? (
          <img
            src={property.shipping_label}
            alt="Shipping Label"
            style={{ maxWidth: '220px' }}
          />
        ) : (
          <img
            src="https://via.placeholder.com/220x70.png?text=Shipping+Label"
            alt="Shipping Label"
            style={{ maxWidth: '220px' }}
          />
        )}
      </div>
    </div>
  );
}

export default PropertyDetails;