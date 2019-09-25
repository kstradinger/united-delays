// Create a map object
const myMap = L.map("map", {
    center: [39.8561, -104.6737],
    zoom: 3
  });
  
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: attribution,
    maxZoom: 18,
    id: "mapbox.streets-basic",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Country data
  const airports = [
  {
    location: [40.6895, -74.1745],
    name: "Newark(EWR)",
    passengerVolume: 11891611,
    avgDelay: '15.22'
  },
  {
    location: [41.9742, -87.9073],
    name: "Chicago O'Hare (ORD)",
    passengerVolume: 12352996,
    avgDelay: '9.65'
  },
  {
    location: [29.9902, -95.3368],
    name: 'Houston (IAH)',
    passengerVolume: 11530238,
    avgDelay: '12.80'
  },
  {
    location: [33.9416, -118.4085],
    name: 'Los Angelos (LAX)',
    passengerVolume: 5196419,
    avgDelay: '8.80'
  },
  {
    location: [13.4853, 144.8008],
    name: "Guam (GUM)",
    passengerVolume: 613353,
    avgDelay: '10.14'
  },
  {
    location: [38.9531, -77.4565],
    name: 'Washington D.C. (IAD)',
    passengerVolume: 4866185,
    avgDelay: '6.02'
  },
  {
    location: [39.8561, -104.6737],
    name: 'Denver (DEN)',
    passengerVolume: 9562482,
    avgDelay: '7.95'
  },
  {
    location: [37.6213, -122.379],
    name: 'San Francisco (SFO)',
    passengerVolume: 10754599,
    avgDelay: '13.02'
  }];
  
  
  // Use forEach to loop through the countries array
  airports.forEach((airport) => {
    // Conditionals for countries points
    let color = "";
    if (airport.avgDelay > 12) {
      color = "red";
    }
    else if (airport.avgDelay > 9) {
      color = "yellow";
    }
    else if (airport.avgDelay > 4) {
      color = "green";
    }
    else {
      color = "black";
    }
  
    // Add circles to map
    L.circle(airport.location, {
      fillOpacity: 0.5,
      color: color,
      fillColor: color,
      radius: airport.passengerVolume * .012
    }).bindPopup(`<h1>  ${airport.name}  </h1> <hr> <h3>Passenger Volume:  ${airport.passengerVolume} </h3> <hr> <h3> Average Delay: ${airport.avgDelay}`)
      .addTo(myMap);
  });