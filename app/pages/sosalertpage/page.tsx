"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockBusData } from "@/constants/mockdata"; // Adjust the path as needed
import { Client, Databases } from 'appwrite';

// Appwrite client configuration
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

const databases = new Databases(client);

export default function SosAlertPage() {
  const [busNumber, setBusNumber] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [busDetails, setBusDetails] = useState<BusDetails | null>(null);
  const [alertStatus, setAlertStatus] = useState<string | null>(null);

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
  };

  // Function to handle SOS alert submission
  const handleAlertSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const bus = mockBusData.find(bus => bus.busNumber === busNumber);
      if (bus) {
        // Update state with bus details and alert status
        setBusDetails(bus);
        setAlertStatus(`SOS alert sent for Bus ${busNumber}: ${alertMessage}`);
        setAlertMessage(""); // Clear the alert message

        // Send data to Appwrite
        const response = await databases.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, // Database ID
          process.env.NEXT_PUBLIC_APPWRITE_SOS_ALERT_COLLECTION_ID as string, // Collection ID
          'unique()', // Unique ID for the document
          {
            busNumber,
            alertMessage,
            busDetails,
          }
        );
        console.log('SOS Alert Document created:', response);
      } else {
        throw new Error("Bus not found");
      }
    } catch (err) {
      if (err instanceof Error) {
        setAlertStatus(`Failed to submit SOS alert. ${err.message}`);
      } else {
        setAlertStatus("Unknown error occurred");
      }
      setBusDetails(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-6">
      <h1 className="text-2xl font-bold mb-6">SOS Alert System</h1>
      <form className="grid gap-6 w-full max-w-md" onSubmit={handleAlertSubmit}>
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
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">SOS Alert Message</label>
          <Input
            type="text"
            placeholder="Enter your SOS message"
            className="p-2 border rounded-md"
            value={alertMessage}
            onChange={(e) => setAlertMessage(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="w-full py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
        >
          Send SOS Alert
        </Button>
      </form>
      {alertStatus && <p className="mt-4 text-red-500">{alertStatus}</p>}
      {busDetails && (
        <div className="mt-6 bg-base-200 p-6 rounded-md shadow-md w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Bus Details</h2>
          <p><strong>Bus Number:</strong> {busDetails.busNumber}</p>
          <p><strong>Route Start:</strong> {busDetails.routeStart}</p>
          <p><strong>Driver:</strong> {busDetails.driver}</p>
          <p><strong>Route End:</strong> {busDetails.routeEnd}</p>
          <p><strong>Total Limit:</strong> {busDetails.totalLimit}</p>
        </div>
      )}
    </div>
  );
}
