"use client";
import React from "react";

export default function NotificationPage() {
  return (
    <div className="relative max-w-screen-lg w-full mx-auto p-5">
      <div className="mockup-browser bg-base-300 border">
        <div className="mockup-browser-toolbar">
          <div className="input">https://sathyabama-transport.com</div>
        </div>
        <div className="bg-base-200 px-4 py-16">
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
              Transport Department Notifications
            </h2>
            <p className="text-neutral-600 text-lg max-w-xl text-center dark:text-neutral-300">
              Welcome to the Sathyabama University Transport Department notification page. Here you will find the latest updates and important information regarding the transportation services.
            </p>
            <div className="mt-8 space-y-4">
              <Notification
                title="Bus Schedule Update"
                date="July 19, 2024"
                description="Please be informed that the bus schedule has been updated. Check the new timings on the official website."
              />
              <Notification
                title="New Bus Routes"
                date="July 18, 2024"
                description="New bus routes have been added to accommodate more students. Please review the new routes and plan your travel accordingly."
              />
              <Notification
                title="Maintenance Notice"
                date="July 17, 2024"
                description="Some buses will be unavailable due to scheduled maintenance. We apologize for any inconvenience caused."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Notification = ({
  title,
  date,
  description,
}: {
  title: string;
  date: string;
  description: string;
}) => {
  return (
    <div className="p-4 rounded-lg bg-white shadow-md dark:bg-gray-800">
      <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
        {title}
      </h3>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">{date}</p>
      <p className="text-neutral-600 dark:text-neutral-300 mt-2">{description}</p>
    </div>
  );
};
