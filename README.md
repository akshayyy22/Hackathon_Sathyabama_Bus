# Sathyabama Bus Hackathon Project

## College Transport Application

### Project Overview
  
<div align="center">
  <video width="600" controls>
    <source src="public/VIDEO.mov" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

This project was developed as part of the Hack the Chit hackathon competition. The College Transport Application is designed to manage and optimize the transportation system for Sathyabama College, offering various features such as bus timing schedules, real-time tracking, crowd management, notifications, route information, feedback and ratings, user authentication, admin panel functionalities, and more.

### Features

1. **Bus Timing Schedules**: Provides detailed schedules for bus timings, ensuring students and staff can plan their travel efficiently.
2. **Real-Time Tracking**: Tracks the real-time location of buses, allowing users to see the exact position and estimated arrival times.
3. **Crowd Management**: Helps in managing the crowd by displaying the number of passengers in each bus.
4. **Notifications**: Sends notifications to users about bus arrivals, delays, and other important information.
5. **Route Information**: Displays detailed route information, including start and end points, and multiple pick-up points.
6. **Feedback and Ratings**: Allows users to rate drivers and provide feedback on the transportation service.
7. **User Authentication**: Ensures secure access to the application through user authentication.
8. **Admin Panel Functionalities**: Enables the admin to manage bus details, driver information, routes, and more.

### Tech Stack

- **Frontend**: React, Next.js, TypeScript
- **Backend**: Appwrite for database management
- **Mapping**: Mapbox for displaying bus routes and real-time tracking
- **UI Components**: Tailwind CSS, DaisyUI
- **AI Integration**: Lumin AI for advanced features

### Project Structure

- **mockdata.ts**: Contains mock data for buses and routes.
- **constants.ts**: Defines constants for bus numbers, routes, and accessibility features for pick-up points.
- **index.ts**: Sample driver details for the rating and search functionality.
- **SOS Alert System**: Sends bus number and details to the Appwrite collection in case of emergencies.

### Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/college-transport-app.git
