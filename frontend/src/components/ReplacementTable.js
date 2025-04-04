// Import necessary libraries and components
import React, { useState } from 'react';
import ScheduleModal from './ScheduleModal';

/**
 * ReplacementTable Component
 * Renders a table of recommended appliance replacements.
 * Allows users to view and order replacement appliances.
 * 
 * @param {Object} props - The properties passed to the component
 * @param {Object} props.property - The property object containing appliance information
 * @param {Array} props.replacements - The list of replacement options
 * @returns {JSX.Element} - The rendered table of replacement appliances
 */
function ReplacementTable({ property, replacements }) {
  // State to control the visibility of the modal
  const [showModal, setShowModal] = useState(false);

  // State to store the currently selected replacement appliance
  const [selectedReplacement, setSelectedReplacement] = useState(null);

  /**
   * Handles the order button click event.
   * Sets the selected replacement appliance and shows the order modal.
   * 
   * @param {Object} rep - The replacement appliance object selected for ordering
   */
  const handleOrder = (rep) => {
    setSelectedReplacement(rep);
    setShowModal(true);
  };

  /**
   * Closes the order modal and clears the selected replacement.
   */
  const closeModal = () => {
    setShowModal(false);
    setSelectedReplacement(null);
  };

  return (
    <div className="replacement-table">
      {/* Header for the recommended replacements */}
      <h5>IterumIQ Recommended Replacement</h5>

      {/* Replacement appliance table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Appliance</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Price</th>
            <th>Efficiency</th>
            <th>Matching Score</th>
            <th>Image</th>
            <th>Order</th>
          </tr>
        </thead>
        <tbody>
          {/* Iterate over the list of replacements to render each row */}
          {replacements.map((rep) => (
            <tr key={rep.id}>
              <td>{rep.name}</td>
              <td>{rep.brand}</td>
              <td>{rep.model_number}</td>
              <td>${rep.price}</td>
              <td>{rep.efficiency}</td>
              <td>{rep.matching_score}%</td>
              <td>
                {/* Display the appliance image if available, otherwise show a placeholder */}
                {property?.appliances?.[0]?.image ? (
                  <img 
                    src={property.appliances[0].image} 
                    alt="Appliance" 
                    style={{ width: '40px', height: '40px' }}
                  />
                ) : (
                  <img 
                    src="https://via.placeholder.com/40" 
                    alt="Appliance" 
                    style={{ width: '40px', height: '40px' }}
                  />
                )}
              </td>
              <td>
                {/* Order button to open the scheduling modal */}
                <button className="order-btn btn btn-primary" onClick={() => handleOrder(rep)}>
                  Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render the schedule modal if an order is selected */}
      {showModal && selectedReplacement && (
        <ScheduleModal 
          property={property} 
          replacement={selectedReplacement} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
}

export default ReplacementTable;