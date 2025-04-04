// Import necessary libraries and components
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import PropertyDetails from './components/PropertyDetails';
import ReplacementTable from './components/ReplacementTable';
import './App.css';

/**
 * App component
 * The main entry point of the application.
 * Fetches property details and recommended replacements from the API.
 * Renders the header, property details, and replacement table.
 */
function App() {
  // Update the API URL to use the environment variable or localhost by default
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost';

  // State to hold the property details
  const [property, setProperty] = useState(null);

  // State to hold the list of recommended replacements
  const [replacements, setReplacements] = useState([]);

  /**
   * useEffect to fetch data on component mount.
   * Fetches both property details and recommended replacements from the API.
   * Logs any errors encountered during the data fetching process.
   */
  useEffect(() => {
    /**
     * Fetch property details from the API endpoint.
     * Uses the property ID 1 as a placeholder.
     * On success, updates the property state with the fetched data.
     * On failure, logs an error message to the console.
     */
    axios
      .get(`${apiUrl}/api/properties/1/`)
      .then((response) => setProperty(response.data))
      .catch((error) => console.error('Error fetching property:', error));

    /**
     * Fetch recommended replacement options from the API endpoint.
     * On success, updates the replacements state with the fetched data.
     * On failure, logs an error message to the console.
     */
    axios
      .get(`${apiUrl}/api/replacements/`)
      .then((response) => setReplacements(response.data))
      .catch((error) => console.error('Error fetching replacements:', error));
  }, [apiUrl]);

  /**
   * Renders the application structure including:
   * - Header component for the application title.
   * - PropertyDetails component to display current property information.
   * - ReplacementTable component to display replacement options.
   */
  return (
    <div className="app-container">
      <Header />
      <div className="content-container">
        <PropertyDetails property={property} />
        <ReplacementTable property={property} replacements={replacements} />
      </div>
    </div>
  );
}

export default App;