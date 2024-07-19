"use client"; // Ensure this component is only rendered on the client side

import { useEffect, useState } from 'react';
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { useRouter } from 'next/router';

export function TypewriterEffectSmoothDemo() {
  const handleStudentPanelClick = () => {
    window.location.href = '/pages/student'; // Navigate to the student panel
  };

  const handleAdminPanelClick = () => {
    window.location.href = '/pages/admin'; // Navigate to the admin panel
  };

  const words = [
    {
      text: "Bus",
    },
    {
      text: "tracking",
    },
    {
      text: "for",
    },
    {
      text: "Sathyabama",
    },
    {
      text: "College.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-[40rem]">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base">
        Enhancing transportation solutions for Sathyabama College
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button 
          onClick={handleStudentPanelClick}
          className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm"
        >
          Student Panel
        </button>
        <button 
          onClick={handleAdminPanelClick}
          className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm"
        >
          Admin Panel
        </button>
      </div>
    </div>
  );
}
