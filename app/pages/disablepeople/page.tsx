// PickUpPoints.tsx
"use client"
import React from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { pickUpPoints } from '@/constants/mockdata';

const accessToken = 'pk.eyJ1IjoiYWtzaGF5eXkyMiIsImEiOiJjbHlyOXh5M3MwNG8wMmpyNGQxbGhubXh0In0.2XU7anTb-yo1n9YJ127BOA';

const PickUpPoints: React.FC = () => {
  const [selectedPoint, setSelectedPoint] = React.useState<any>(null);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', height: '100vh' }}>
      <Map
        initialViewState={{
          latitude: 13.119233,
          longitude: 80.242915,
          zoom: 12
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={accessToken}
      >
        {pickUpPoints.map((point) => (
          <Marker
            key={point.busNumber}
            longitude={parseFloat(point.coordinates.split(',')[0])}
            latitude={parseFloat(point.coordinates.split(',')[1])}
            anchor="bottom"
            onClick={() => setSelectedPoint(point)}
          >
            <div style={{ backgroundColor: 'red', color: 'white', padding: '5px', borderRadius: '3px' }}>
              {point.pickUpLocation}
            </div>
          </Marker>
        ))}

        {selectedPoint && (
          <Popup
            longitude={parseFloat(selectedPoint.coordinates.split(',')[0])}
            latitude={parseFloat(selectedPoint.coordinates.split(',')[1])}
            onClose={() => setSelectedPoint(null)}
          >
            <div>
              <h3>{selectedPoint.pickUpLocation}</h3>
              <p>Description: {selectedPoint.pickUpPointDescription}</p>
              <p>Driver: {selectedPoint.driverName}</p>
              <p>Registration No: {selectedPoint.registrationNumber}</p>
              <p>Contact: {selectedPoint.contactNumber}</p>
              <p>Accessibility Features: {selectedPoint.accessibilityFeatures.join(', ')}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default PickUpPoints;
