"use client";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Sample driver data type
interface Driver {
  id: number;
  name: string;
  photoUrl: string;
  busNumber: string;
  busRoute: string;
}

// Rating component
const Rating = ({ initialRating, onChange }: { initialRating: number; onChange: (rating: number) => void; }) => {
  const [rating, setRating] = useState<number>(initialRating);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleRatingChange = (value: number) => {
    setRating(value);
    onChange(value);
  };

  return (
    <div className="rating flex space-x-1 mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <input
          key={star}
          type="radio"
          name={`rating-${star}`}
          value={star}
          className="mask mask-star-2 bg-green-500"
          checked={rating === star}
          onChange={() => handleRatingChange(star)}
        />
      ))}
    </div>
  );
};

// Label and Input Container
const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string; }) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>
    {children}
  </div>
);

const DriverRatingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [alertMessage, setAlertMessage] = useState('');

  // Sample driver data
  const sampleDrivers: Driver[] = [
    { id: 1, name: 'John Doe', photoUrl: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp', busNumber: '123', busRoute: 'Route A' },
    { id: 2, name: 'Jane Smith', photoUrl: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp', busNumber: '456', busRoute: 'Route B' },
    { id: 3, name: 'Alice Johnson', photoUrl: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp', busNumber: '789', busRoute: 'Route C' },
  ];

  useEffect(() => {
    const results = sampleDrivers.filter(driver =>
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.busNumber.includes(searchTerm)
    );
    setFilteredDrivers(results);
  }, [searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRatingChange = (driverId: number, rating: number) => {
    setRatings(prevRatings => ({ ...prevRatings, [driverId]: rating }));
  };

  const handleSubmit = (driverId: number) => {
    const rating = ratings[driverId] || 0;
    setAlertMessage(`Rating for driver ${driverId} has been submitted with a rating of ${rating}!`);
    setTimeout(() => setAlertMessage(''), 3000); // Hide alert after 3 seconds
  };

  return (
    <div className="relative max-w-screen-lg w-full mx-auto p-5">
      <div className="rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-slate-900">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Driver Rating Page
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Search for a driver and provide a rating.
        </p>

        <form className="my-8">
          <LabelInputContainer>
            <Label htmlFor="search">Search Driver</Label>
            <Input
              id="search"
              placeholder="Search by name or bus number"
              type="text"
              value={searchTerm}
              onChange={handleSearch}
            />
          </LabelInputContainer>

          {filteredDrivers.length > 0 ? (
            <div className="space-y-4 mt-4">
              {filteredDrivers.map(driver => (
                <div key={driver.id} className="flex items-center space-x-4 border-b pb-4">
                  <img src={driver.photoUrl} alt={driver.name} className="w-16 h-16 rounded-full object-cover" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{driver.name}</h3>
                    <p>Bus Number: {driver.busNumber}</p>
                    <p>Bus Route: {driver.busRoute}</p>
                    <Rating
                      initialRating={ratings[driver.id] || 0}
                      onChange={(rating) => handleRatingChange(driver.id, rating)}
                    />
                    <button
                      type="button"
                      onClick={() => handleSubmit(driver.id)}
                      className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    >
                      Submit Rating
                      <BottomGradient />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-neutral-600 dark:text-neutral-300">No drivers found.</p>
          )}
        </form>
      </div>

      {alertMessage && (
        <div role="alert" className="alert alert-success absolute bottom-4 right-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{alertMessage}</span>
        </div>
      )}
    </div>
  );
};

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

export default DriverRatingPage;
