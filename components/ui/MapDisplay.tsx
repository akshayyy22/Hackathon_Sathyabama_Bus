import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

type MapDisplayProps = {
  origin: string;
  destination: string;
  route: any; // Replace with the actual type if available
};

const MapDisplay: React.FC<MapDisplayProps> = ({ origin, destination, route }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoiYWtzaGF5eXkyMiIsImEiOiJjbHlyOXh5M3MwNG8wMmpyNGQxbGhubXh0In0.2XU7anTb-yo1n9YJ127BOA'; // Replace with your Mapbox token

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11', // You can use other Mapbox styles
      center: [parseFloat(origin.split(',')[0]), parseFloat(origin.split(',')[1])],
      zoom: 13,
    });

    map.on('load', () => {
      map.addSource('route', {
        type: 'geojson',
        data: route,
      });

      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': '#007cbf',
          'line-width': 8,
        },
      });

      // Add markers for origin and destination
      new mapboxgl.Marker()
        .setLngLat([parseFloat(origin.split(',')[0]), parseFloat(origin.split(',')[1])])
        .addTo(map);

      new mapboxgl.Marker()
        .setLngLat([parseFloat(destination.split(',')[0]), parseFloat(destination.split(',')[1])])
        .addTo(map);
    });

    return () => map.remove();
  }, [origin, destination, route]);

  return <div style={{ height: '400px', width: '100%' }} ref={mapContainerRef} />;
};

export default MapDisplay;
