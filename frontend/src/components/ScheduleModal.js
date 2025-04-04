import React, { useState } from 'react';
import axios from 'axios';

/**
 * Helper function: Formats a date as YYYY-MM-DD for API payload.
 * @param {Date} date - The date to format.
 * @returns {string} - Formatted date as a string.
 */
const formatDate = (date) => date.toISOString().slice(0, 10);

/**
 * Helper function: Get ordinal suffix for a day (1st, 2nd, 3rd, etc.).
 * @param {number} n - The day number.
 * @returns {string} - Day number with appropriate ordinal suffix.
 */
const ordinalSuffix = (n) => {
  const j = n % 10, k = n % 100;
  if (j === 1 && k !== 11) return n + "st";
  if (j === 2 && k !== 12) return n + "nd";
  if (j === 3 && k !== 13) return n + "rd";
  return n + "th";
};

// Month abbreviations for better readability.
const monthAbbr = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
  'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
];

/**
 * Helper function: Formats a date for display as a label.
 * @param {Date} date - The date to format.
 * @returns {string} - Formatted date label.
 */

// Helper function: Format date for display label.
const formatLabel = (date) => {
  const day = date.getDate();
  const ordinal = ordinalSuffix(day);
  const month = monthAbbr[date.getMonth()];
  return `${ordinal} ${month}`;
};

// CSS styles for the modal
const modalStyles = `
/* Dark overlay background with increased opacity for clarity */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Modal container styling */
.schedule-modal-content {
  background: #fff;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  color: #333;
}

/* Modal header */
.schedule-modal-content .modal-header {
  border-bottom: none;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.schedule-modal-content .modal-title {
  font-weight: 600;
  font-size: 1.2rem;
}
.schedule-modal-content .btn-close {
  background: transparent;
  border: none;
  font-size: 1.6rem;
  color: #333;
}

/* Modal body */
.schedule-modal-content .modal-body {
  padding: 0 1.5rem 1rem;
  font-size: 1rem;
  line-height: 1.4;
}

/* Appliance info box styling */
.appliance-info-box {
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f9f9f9;
  padding: 15px;
  margin-bottom: 15px;
}

/* Instruction text */
.instruction-text {
  color: #333;
  font-weight: 500;
  margin-bottom: 10px;
}

/* Success message styling */
.success-message {
  text-align: center;
  color: green;
  font-weight: bold;
  margin: 15px 0;
}

/* Modal footer */
.schedule-modal-content .modal-footer {
  border-top: none;
  padding: 0 1.5rem 1.5rem;
}

/* Date buttons styling */
.date-buttons .date-option-button {
  background-color: #f1f3f5;
  border: 1px solid #ccc;
  color: #333;
  font-size: 0.9rem;
  padding: 6px 12px;
  border-radius: 4px;
}
.date-buttons .date-option-button.active,
.date-buttons .date-option-button:hover {
  background-color: #4c8ef7;
  color: #fff;
  border-color: #4c8ef7;
}

/* Time selection styling */
.time-selection label {
  font-weight: 500;
  font-size: 0.95rem;
}
.time-selection .form-control {
  display: inline-block;
  width: auto;
  text-align: center;
}

/* Optional note textarea */
.schedule-modal-content textarea {
  resize: vertical;
}

/* Footer buttons */
.schedule-modal-content .btn-secondary {
  background-color: #aaa;
  border-color: #aaa;
  font-size: 0.95rem;
}
.schedule-modal-content .btn-secondary:hover {
  background-color: #888;
  border-color: #888;
}
.schedule-modal-content .btn-primary {
  font-size: 0.95rem;
}
`;

/**
 * ScheduleModal Component
 * Displays a modal for scheduling a replacement appliance.
 * Handles order submission and feedback on success.
 */
function ScheduleModal({ property, replacement, onClose }) {

  // Set the API URL to use the environment variable or default to localhost
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost';

  // Compute dynamic date options: Today, Tomorrow, and Day After Tomorrow.
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(today.getDate() + 2);

  const dynamicDateOptions = [
    { label: formatLabel(today), value: formatDate(today) },
    { label: formatLabel(tomorrow), value: formatDate(tomorrow) },
    { label: formatLabel(dayAfter), value: formatDate(dayAfter) },
  ];

  const [selectedDateOption, setSelectedDateOption] = useState(null);
  const [customDate, setCustomDate] = useState('');
  const [hour, setHour] = useState('10');
  const [minute, setMinute] = useState('30');
  const [note, setNote] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const faultyAppliance = property?.appliances?.[0];

  const handleConfirm = () => {
    let finalDate = selectedDateOption;
    if (selectedDateOption === 'other') {
      finalDate = customDate;
    }
    if (!finalDate) {
      alert('Please select a date or enter a custom date.');
      return;
    }
    if (!hour || !minute) {
      alert('Please enter both hour and minute.');
      return;
    }

    const payload = {
      property: property.id,
      appliance: faultyAppliance.id,
      replacement: replacement.id,
      scheduled_date: finalDate,
      scheduled_time: `${hour}:${minute}`,
      note,
    };

    axios.post(`${apiUrl}/api/orders/`, payload)
      .then(() => {
        setOrderSuccess(true);
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 5000);
      })
      .catch(error => {
        console.error('Error placing order:', error);
        alert('There was an error placing your order.');
      });
  };

  const renderDateButtons = () => (
    <div className="date-buttons d-flex flex-wrap mb-3">
      {dynamicDateOptions.map(option => (
        <button
          key={option.value}
          className={`btn date-option-button me-2 mb-2 ${selectedDateOption === option.value ? 'active' : ''}`}
          onClick={() => {
            setSelectedDateOption(option.value);
            setCustomDate('');
          }}
        >
          {option.label}
        </button>
      ))}
      <button
        className={`btn date-option-button mb-2 ${selectedDateOption === 'other' ? 'active' : ''}`}
        onClick={() => setSelectedDateOption('other')}
      >
        Select Other Date
      </button>
    </div>
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content schedule-modal-content">
        <div className="modal-header d-flex justify-content-between align-items-center">
          <h5 className="modal-title">Schedule Replacement</h5>
          <button 
            type="button" 
            className="btn-close" 
            aria-label="Close" 
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="modal-body">
          {orderSuccess ? (
            <div className="success-message">Order placed successfully!</div>
          ) : (
            <>
              <div className="appliance-info-box mb-3">
                <p><strong>Appliance:</strong> {replacement.name}</p>
                <p><strong>Brand:</strong> {replacement.brand}</p>
                <p><strong>Model:</strong> {replacement.model_number}</p>
                <p><strong>Price:</strong> ${replacement.price}</p>
                <p><strong>Efficiency:</strong> {replacement.efficiency}</p>
                <p><strong>Matching Score:</strong> {replacement.matching_score}%</p>
              </div>
              <hr />
              <p className="instruction-text"><strong>Please select date and time:</strong></p>
              {renderDateButtons()}
              {selectedDateOption === 'other' && (
                <div className="mb-3">
                  <input 
                    type="date" 
                    className="form-control" 
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                  />
                </div>
              )}
              <div className="time-selection d-flex align-items-center mb-3">
                <label className="me-2">Select Time:</label>
                <input 
                  type="text"
                  className="form-control me-1"
                  style={{ width: '60px' }}
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                  placeholder="HH"
                />
                <span className="me-1">:</span>
                <input 
                  type="text"
                  className="form-control"
                  style={{ width: '60px' }}
                  value={minute}
                  onChange={(e) => setMinute(e.target.value)}
                  placeholder="MM"
                />
              </div>
              <div className="mb-3">
                <label>Installation/Delivery Instructions (Optional):</label>
                <textarea 
                  className="form-control mt-1"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                />
              </div>
            </>
          )}
        </div>
        {!orderSuccess && (
          <div className="modal-footer d-flex justify-content-end">
            <button 
              type="button" 
              className="btn btn-secondary me-2" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        )}
      </div>
      <style>{modalStyles}</style>
    </div>
  );
}

export default ScheduleModal;