"use client";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: "Real-time Tracking",
    description:
      "Track the exact location of buses in real time. Our platform allows students, parents, and staff to know where the buses are at any moment, ensuring timely arrivals and departures.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Real-time Tracking
      </div>
    ),
  },
  {
    title: "SOS Alerts",
    description:
      "Safety is our top priority. With our SOS alert feature, students and staff can send immediate alerts in case of emergencies. The system notifies the relevant authorities instantly, ensuring quick response times.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        SOS-Alert 
      </div>
    ),
  },
  {
    title: "Route Optimization",
    description:
      "Our platform optimizes bus routes for efficiency and time savings. By analyzing traffic patterns and student locations, we ensure that buses take the best possible routes, reducing travel time and fuel consumption.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        Route Optimization
      </div>
    ),
  },
  {
    title: "User-friendly Interface",
    description:
      "Our platform features an intuitive and easy-to-use interface. Students, parents, and staff can easily navigate through the system, access real-time data, and utilize all the features without any hassle.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        User-friendly Interface
      </div>
    ),
  },
];

export function StickyScrollRevealDemo() {
  return (
    <div className="p-10">
      <StickyScroll content={content} />
    </div>
  );
}
