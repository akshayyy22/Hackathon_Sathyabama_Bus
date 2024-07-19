"use client";

import React, { useEffect, useState } from 'react';
import MapDisplay from '@/components/ui/MapDisplay'; // Ensure the path is correct
import { mockBusData } from '@/constants/mockdata'; // Ensure the path is correct

const BusList: React.FC = () => {
  const [routeData, setRouteData] = useState<{ [key: string]: any }>({}); // Store route data for each bus

  const fetchRouteData = async (busNumber: string, url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setRouteData((prev) => ({
        ...prev,
        [busNumber]: data.routes[0].geometry, // Assuming the route data is in this structure
      }));
    } catch (err) {
      console.error(`Failed to fetch route data for ${busNumber}:`, err);
    }
  };

  useEffect(() => {
    mockBusData.forEach((bus) => fetchRouteData(bus.busNumber, bus.url));
  }, []);

  return (
    <div className="min-h-screen bg-black p-6">
      <h1 className="text-2xl font-bold mb-6 text-white text-center">Bus Routes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBusData.map((bus) => (
          <div key={bus.busNumber} className="bg-base-300 p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4 text-white">Bus Number: {bus.busNumber}</h2>
            <p className="text-white"><strong>Route Start:</strong> {bus.routeStart}</p>
            <p className="text-white"><strong>Route End:</strong> {bus.routeEnd}</p>
            {routeData[bus.busNumber] && (
              <MapDisplay
                origin={bus.routestartCoordinate}
                destination={bus.routeendCoordinate}
                route={routeData[bus.busNumber]}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusList;
