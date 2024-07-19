"use client";

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { mockBusData } from '@/constants/mockdata'; // Adjust the path as per your file structure
import DistanceInfo from '@/components/ui/DistanceInfo';
import MapDisplay from '@/components/ui/MapDisplay'; // Import your MapDisplay component

type BusDetails = {
  busNumber: string;
  routeStart: string;
  driver: string;
  routeEnd: string;
  totalLimit: number;
  occupied: number;
  seatsAvailable: number;
  occupiedSeats: number[];
  routestartCoordinate: string;
  routeendCoordinate: string;
  url: string; // Ensure that your BusDetails type includes url
};

export default function StudentPanel() {
  const [busNumber, setBusNumber] = useState<string>('');
  const [busDetails, setBusDetails] = useState<BusDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [routeData, setRouteData] = useState<any>(null); // Update type based on route data

  const fetchRouteData = async (url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setRouteData(data.routes[0].geometry); // Assuming the route data is in this structure
    } catch (err) {
      console.error('Failed to fetch route data:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const bus = mockBusData.find((bus) => bus.busNumber === busNumber);
      if (bus) {
        // Simulate dynamic data
        const totalSeats = bus.totalLimit;
        const preoccupiedSeats = 10;
        const occupiedSeats = new Set<number>();

        while (occupiedSeats.size < preoccupiedSeats) {
          const randomSeat = Math.floor(Math.random() * totalSeats) + 1;
          occupiedSeats.add(randomSeat);
        }

        const updatedBusDetails = {
          ...bus,
          occupiedSeats: Array.from(occupiedSeats),
          seatsAvailable: totalSeats - occupiedSeats.size,
          occupied: occupiedSeats.size,
        };

        setBusDetails(updatedBusDetails);
        setError(null);

        // Fetch the route data from Mapbox
        fetchRouteData(bus.url);
      } else {
        throw new Error('Bus not found');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error occurred');
      }
      setBusDetails(null);
    }
  };

  const handleSeatSelect = (seatNumber: number) => {
    if (!busDetails) return;

    if (busDetails.occupiedSeats.includes(seatNumber)) {
      return;
    }

    setSelectedSeat((prevSelectedSeat) =>
      prevSelectedSeat === seatNumber ? null : seatNumber
    );
  };

  useEffect(() => {
    if (!busDetails || selectedSeat === null) return;

    setBusDetails((prevDetails) => {
      if (!prevDetails) return null;

      const isSeatSelected = prevDetails.occupiedSeats.includes(selectedSeat);
      const updatedSeatsAvailable = isSeatSelected
        ? prevDetails.seatsAvailable + 1
        : prevDetails.seatsAvailable - 1;

      const updatedOccupiedSeats = isSeatSelected
        ? prevDetails.occupiedSeats.filter((seat) => seat !== selectedSeat)
        : [...prevDetails.occupiedSeats, selectedSeat];

      return {
        ...prevDetails,
        seatsAvailable: updatedSeatsAvailable,
        occupiedSeats: updatedOccupiedSeats,
      };
    });
  }, [selectedSeat]);

  const renderSeat = (index: number) => {
    if (!busDetails) return null;

    const seatNumber = index + 1;
    const isOccupied = busDetails.occupiedSeats.includes(seatNumber);
    const seatStatusClass = isOccupied
      ? 'bg-red-500'
      : selectedSeat === seatNumber
      ? 'bg-yellow-500'
      : 'bg-green-500';

    return (
      <button
        key={index}
        onClick={() => handleSeatSelect(seatNumber)}
        className={`w-10 h-10 border rounded ${seatStatusClass}`}
        disabled={isOccupied}
      >
        {seatNumber}
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Check Availability</h1>
      <form className="grid gap-6 w-full max-w-md" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">Bus Number</label>
          <Input
            type="text"
            placeholder="Enter Bus Number"
            className="p-2 border rounded-md"
            value={busNumber}
            onChange={(e) => setBusNumber(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {busDetails && (
        <div className="mt-6 bg-black p-6 rounded-md shadow-md w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Bus Details</h2>
          <p>
            <strong>Route Start:</strong> {busDetails.routeStart}
          </p>
          <p>
            <strong>Driver:</strong> {busDetails.driver}
          </p>
          <p>
            <strong>Route End:</strong> {busDetails.routeEnd}
          </p>
          <p>
            <strong>Total Limit:</strong> {busDetails.totalLimit}
          </p>
          <p>
            <strong>Occupied:</strong> {busDetails.occupied}
          </p>
          <p>
            <strong>Seats Available:</strong> {busDetails.seatsAvailable}
          </p>

          <h2 className="text-xl font-bold mb-4">Select Your Seat</h2>
          <div className="flex flex-col items-center">
            <div className="flex place-items-end mb-4">
              <span className="w-10 h-10 border rounded-full flex items-center justify-center bg-gray-700 text-white">
                🚌
              </span>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-2 space-y-2">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div key={index} className="flex space-x-2">
                    {renderSeat(index)}
                    {renderSeat(index + 10)}
                  </div>
                ))}
              </div>

              <div className="col-span-1"></div>

              <div className="col-span-2 space-y-2">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div key={index + 20} className="flex space-x-2">
                    {renderSeat(index + 20)}
                    {renderSeat(index + 30)}
                    {renderSeat(index + 40)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {busDetails && (
        <div className="mt-6 bg-black p-6 rounded-md shadow-md w-full max-w-md">
          <DistanceInfo
            origin={busDetails.routestartCoordinate}
            destination={busDetails.routeendCoordinate}
          />
        </div>
      )}

      {routeData && busDetails && (
        <div className="mt-6 bg-black p-6 rounded-md shadow-md w-full max-w-md">
          <MapDisplay
            origin={busDetails.routestartCoordinate}
            destination={busDetails.routeendCoordinate}
            route={routeData}
          />
        </div>
      )}
    </div>
  );
}
