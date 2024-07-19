import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mapboxgl, { LngLatBounds, LngLatLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Ensure Mapbox GL CSS is imported

type DistanceInfoProps = {
  origin: string; // Coordinates in 'longitude,latitude' format
  destination: string; // Coordinates in 'longitude,latitude' format
};

const DistanceInfo: React.FC<DistanceInfoProps> = ({ origin, destination }) => {
  const [distanceData, setDistanceData] = useState<any>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const apiKey = 'pk.eyJ1IjoiYWtzaGF5eXkyMiIsImEiOiJjbHlyOXh5M3MwNG8wMmpyNGQxbGhubXh0In0.2XU7anTb-yo1n9YJ127BOA'; // Replace with your actual Mapbox API key

  useEffect(() => {
    const fetchDistanceData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${origin};${destination}`,
          {
            params: {
              geometries: 'geojson',
              language: 'en',
              overview: 'full',
              steps: true,
              access_token: apiKey,
            },
          }
        );
        setDistanceData(response.data);
      } catch (error) {
        console.error('Error fetching distance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDistanceData();
  }, [origin, destination, apiKey]);

  useEffect(() => {
    if (!map && document.getElementById('map')) {
      mapboxgl.accessToken = apiKey;
      const newMap = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [
          (parseFloat(origin.split(',')[0]) + parseFloat(destination.split(',')[0])) / 2,
          (parseFloat(origin.split(',')[1]) + parseFloat(destination.split(',')[1])) / 2
        ],
        zoom: 10,
      });
      newMap.on('load', () => {
        setMap(newMap);
      });

      newMap.on('error', (e) => {
        console.error('Map error:', e);
      });
    }
  }, [map, apiKey, origin, destination]);

  useEffect(() => {
    if (map && distanceData) {
      const addRouteLineToMap = () => {
        const coordinates = distanceData.routes[0].geometry.coordinates;
        map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: coordinates as any,
              },
            },
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#888',
            'line-width': 6,
          },
        });

        const bounds = coordinates.reduce((bounds: LngLatBounds, coord: number[]) => {
          return bounds.extend(coord as LngLatLike);
        }, new mapboxgl.LngLatBounds());

        map.fitBounds(bounds, {
          padding: {
            top: 50,
            bottom: 50,
            left: 50,
            right: 50,
          },
        });
      };

      addRouteLineToMap();
    }
  }, [distanceData, map]);

  return (
    <div>
      {loading ? (
        <p>Loading distance information...</p>
      ) : distanceData ? (
        <div>
          <h2>Distance Information</h2>
          <p>Origin: {origin}</p>
          <p>Destination: {destination}</p>
          <p>Distance: {(distanceData.routes[0].distance / 1000).toFixed(2)} km</p>
          <p>Duration: {(distanceData.routes[0].duration / 60).toFixed(2)} minutes</p>
        </div>
      ) : (
        <p>Error fetching distance information</p>
      )}
    </div>
  );
};

export default DistanceInfo;
