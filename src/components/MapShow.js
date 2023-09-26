import React, { useState, useEffect } from 'react';
import { GoogleMap } from '@react-google-maps/api';

function LocationDetail({ match }) {
  const [location, setLocation] = useState(null);

  // Assuming you have an API endpoint to fetch location data by ID
  const fetchLocationData = async () => {
    const response = await fetch(`/api/locations/${match.params.id}`);
    const data = await response.json();
    setLocation(data); // Set location data in state
  };

  useEffect(() => {
    fetchLocationData();
  }, [match.params.id]);

  const mapContainerStyles = {
    height: "400px",
    width: "100%"
  };

  if (!location) {
    // You can display a loading indicator or error message if data is still loading or not found
    return <div>Loading...</div>;
  }

  const { name, description, latitude, longitude } = location;

  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
      <div style={mapContainerStyles}>
        <GoogleMap
          mapContainerStyle={mapContainerStyles}
          zoom={12}
          center={{ lat: latitude, lng: longitude }}
        >
          {/* You can add markers or additional map content here if needed */}
        </GoogleMap>
      </div>
    </div>
  );
}

export default LocationDetail;

  