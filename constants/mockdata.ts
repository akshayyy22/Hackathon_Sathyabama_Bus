const generateUrl = (start: string, end: string, token: string) => 
  `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${start};${end}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${token}`;

const accessToken = 'pk.eyJ1IjoiYWtzaGF5eXkyMiIsImEiOiJjbHlyOXh5M3MwNG8wMmpyNGQxbGhubXh0In0.2XU7anTb-yo1n9YJ127BOA';

export const mockBusData = [
  {
    busNumber: "BUS001",
    routeStart: "Madhavaram",
    driver: "John Doe",
    routeEnd: "Sathyabama College",
    totalLimit: 50,
    occupied: 0,
    seatsAvailable: 50,
    occupiedSeats: [],
    routestartCoordinate: "80.242915,13.119233",
    routeendCoordinate: "80.223153,12.873212500000001",
    url: generateUrl("80.242915,13.119233", "80.223153,12.873212500000001", accessToken)
  },
  {
    busNumber: "BUS002",
    routeStart: "Perambur",
    driver: "John Doe",
    routeEnd: "Sathyabama College",
    totalLimit: 50,
    occupied: 0,
    seatsAvailable: 50,
    occupiedSeats: [],
    routestartCoordinate: "80.242606,13.109012",
    routeendCoordinate: "80.223153,12.873212500000001",
    url: generateUrl("80.242606,13.109012", "80.223153,12.873212500000001", accessToken)
  },
  {
    busNumber: "BUS003",
    routeStart: "Purasawalkam",
    driver: "John Doe",
    routeEnd: "Sathyabama College",
    totalLimit: 50,
    occupied: 0,
    seatsAvailable: 50,
    occupiedSeats: [],
    routestartCoordinate: "80.25502,13.087708",
    routeendCoordinate: "80.223153,12.873212500000001",
    url: generateUrl("80.25502,13.087708", "80.223153,12.873212500000001", accessToken)
  },
  {
    busNumber: "BUS004",
    routeStart: "T Nagar Post Office",
    driver: "John Doe",
    routeEnd: "Sathyabama College",
    totalLimit: 50,
    occupied: 0,
    seatsAvailable: 50,
    occupiedSeats: [],
    routestartCoordinate: "80.234819,13.040689",
    routeendCoordinate: "80.223153,12.873212500000001",
    url: generateUrl("80.234819,13.040689", "80.223153,12.873212500000001", accessToken)
  },
  {
    busNumber: "BUS005",
    routeStart: "Kodungaiyur",
    driver: "John Doe",
    routeEnd: "Sathyabama College",
    totalLimit: 50,
    occupied: 0,
    seatsAvailable: 50,
    occupiedSeats: [],
    routestartCoordinate: "80.24292,13.133062",
    routeendCoordinate: "80.223153,12.873212500000001",
    url: generateUrl("80.24292,13.133062", "80.223153,12.873212500000001", accessToken)
  },
  {
    busNumber: "BUS006",
    routeStart: "Perungalathur",
    driver: "John Doe",
    routeEnd: "Sathyabama College",
    totalLimit: 50,
    occupied: 0,
    seatsAvailable: 50,
    occupiedSeats: [],
    routestartCoordinate: "79.65659,13.186481",
    routeendCoordinate: "80.223153,12.873212500000001",
    url: generateUrl("79.65659,13.186481", "80.223153,12.873212500000001", accessToken)
  },
  {
    busNumber: "BUS007",
    routeStart: "Manali",
    driver: "John Doe",
    routeEnd: "Sathyabama College",
    totalLimit: 50,
    occupied: 0,
    seatsAvailable: 50,
    occupiedSeats: [],
    routestartCoordinate: "80.258484,13.167439",
    routeendCoordinate: "80.223153,12.873212500000001",
    url: generateUrl("80.258484,13.167439", "80.223153,12.873212500000001", accessToken)
  },
  {
    busNumber: "BUS008",
    routeStart: "Arumbakkam",
    driver: "John Doe",
    routeEnd: "Sathyabama College",
    totalLimit: 50,
    occupied: 0,
    seatsAvailable: 50,
    occupiedSeats: [],
    routestartCoordinate: "80.20815,13.074424",
    routeendCoordinate: "80.223153,12.873212500000001",
    url: generateUrl("80.20815,13.074424", "80.223153,12.873212500000001", accessToken)
  },
  {
    busNumber: "BUS009",
    routeStart: "Manali",
    driver: "John Doe",
    routeEnd: "Sathyabama College",
    totalLimit: 50,
    occupied: 0,
    seatsAvailable: 50,
    occupiedSeats: [],
    routestartCoordinate: "80.236664,12.938133",
    routeendCoordinate: "80.223153,12.873212500000001",
    url: generateUrl("80.236664,12.938133", "80.223153,12.873212500000001", accessToken)
  },
  {
    busNumber: "BUS010",
    routeStart: "Manali",
    driver: "John Doe",
    routeEnd: "Sathyabama College",
    totalLimit: 50,
    occupied: 0,
    seatsAvailable: 50,
    occupiedSeats: [],
    routestartCoordinate: "80.23739,13.083524",
    routeendCoordinate: "80.223153,12.873212500000001",
    url: generateUrl("80.23739,13.083524", "80.223153,12.873212500000001", accessToken)
  },
  
];

// constants.ts
// constants.ts

export const pickUpPoints = [
  {
    busNumber: "BUS001",
    pickUpLocation: "Madhavaram",
    coordinates: "80.242915,13.119233",
    pickUpPointDescription: "Main entrance of Madhavaram, near the bus stand.",
    accessibilityFeatures: [
      "Wheelchair accessible",
      "Priority seating"
    ],
    contactNumber: "123-456-7890",
    driverName: "John Doe",
    registrationNumber: "TN-01-AB-1234"
  },
  {
    busNumber: "BUS002",
    pickUpLocation: "Perambur",
    coordinates: "80.242606,13.109012",
    pickUpPointDescription: "Near Perambur Railway Station.",
    accessibilityFeatures: [
      "Wheelchair accessible",
      "Elevator available"
    ],
    contactNumber: "123-456-7891",
    driverName: "Jane Smith",
    registrationNumber: "TN-01-AB-5678"
  },
  {
    busNumber: "BUS003",
    pickUpLocation: "T Nagar Post Office",
    coordinates: "80.234819,13.040689",
    pickUpPointDescription: "Outside T Nagar Post Office, next to the ATM.",
    accessibilityFeatures: [
      "Wheelchair accessible",
      "Priority seating"
    ],
    contactNumber: "123-456-7892",
    driverName: "Alice Brown",
    registrationNumber: "TN-01-AB-9101"
  },
  {
    busNumber: "BUS004",
    pickUpLocation: "Kodungaiyur",
    coordinates: "80.24292,13.133062",
    pickUpPointDescription: "Kodungaiyur Bus Stop, near the market.",
    accessibilityFeatures: [
      "Wheelchair accessible",
      "Priority seating"
    ],
    contactNumber: "123-456-7893",
    driverName: "Bob Johnson",
    registrationNumber: "TN-01-AB-1122"
  },
  {
    busNumber: "BUS005",
    pickUpLocation: "Arumbakkam",
    coordinates: "80.20815,13.074424",
    pickUpPointDescription: "Arumbakkam Main Road, near the shopping center.",
    accessibilityFeatures: [
      "Wheelchair accessible",
      "Elevator available"
    ],
    contactNumber: "123-456-7894",
    driverName: "Charlie Davis",
    registrationNumber: "TN-01-AB-3344"
  }
  // Add more entries as needed
];
