// MapComponent.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import './Dashboard.css';

const MapComponent = ({ location }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCkS-rvIOxbQX6q9mT_VGjeX_GnVC_aW_Y&libraries=places`;
    script.defer = true;
    script.onload = () => {
      // Once the Google Maps API script is loaded, initialize the map
      const googleMap = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: location.lat, lng: location.lng },
        zoom: 5,
      });
      setMap(googleMap);
    };
    document.head.appendChild(script);
  }, [location]);

  return (
    <div id="map" style={{ height: '200px', width: '100%' }}>
      {map && <Marker position={{ lat: location.lat, lng: location.lng }} map={map} />}
    </div>
  );
};

export default MapComponent;
