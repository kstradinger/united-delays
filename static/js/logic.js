
// Light layer
const light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: attribution,
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });
  //Dark Layer
  const dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: attribution,
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });
  
  // Only one base layer can be shown at a time
  const baseMaps = {
    Light: light,
    Dark: dark
  };

  const myMap = L.map("map-id", {
    center: [46.2276, 2.2137],
    zoom: 6,
    layers: [baseMaps]
  });

  L.control.layers(baseMaps, {
    collapsed: true
  }).addTo(myMap);
  
  