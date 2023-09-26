import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import ShowModal from './Modal'
import Nav from './Nav'
import useGoogleAuth from './useGoogleAuth'

const MapContainer = () => {
  let API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const {user, profile} = useGoogleAuth()

  console.log(user, profile)

  const mapContainerStyles = {
    height: "100vh",
    width: "100%"
  };
  
  const defaultCenter = {
    lat: 40.783660, lng: -73.965019
  };

  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState(defaultCenter);
  const [showModal, setModalVis] = useState(false)

  const handleMapClick = (event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setCenter(newMarker);
    setMarkers(currentMarkers => [...currentMarkers, newMarker]);
  };

  const handleShowEvent = () => {
    setModalVis(prevState => !prevState)
  }

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyles}
        zoom={14}
        center={center}
        onDblClick={handleMapClick}
        options={{
          mapId: "af6bc521083dc9cf",
          disableDoubleClickZoom: true,
        }}
      >
        <Nav/>
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} onClick={handleShowEvent} />
        ))}
        <ShowModal show={showModal}/>
      </GoogleMap>
    </LoadScript>
  );
}

export default MapContainer;