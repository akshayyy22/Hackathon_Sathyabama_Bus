
"use client"
import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

interface MapboxMapProps {
  points: {
    coordinates: string;
    pickUpLocation: string;
  }[];
}

const MapboxMap: React.FC<MapboxMapProps> = ({ points }) => {
  useEffect(() => {
    // Initialize Mapbox
    mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
    const map = new mapboxgl.Map({
      container: 'map', // Container ID
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: [80.242915, 13.119233], // Center map at a default location
      zoom: 12, // Initial zoom level
    });

    // Add markers for each point
    points.forEach(point => {
      const [lng, lat] = point.coordinates.split(',').map(Number);
      new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .setPopup(new mapboxgl.Popup().setText(point.pickUpLocation))
        .addTo(map);
    });

    return () => map.remove();
  }, [points]);

  return <div id="map" style={{ width: '100%', height: '500px' }} />;
};

export default MapboxMap;
