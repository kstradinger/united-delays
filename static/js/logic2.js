function createMap2(EarthquakeMarkersLayer){
    console.log(EarthquakeMarkersLayer);

    // Created a baseMaps object to hold the lightmap and darkmap layer
    // Defined variables for tile layers
    const light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: attribution,
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
    });

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

    // Create an overlayMaps object to hold the earthquake data layer
    // This creates overlays that may be toggled on or off
    const overlayMaps = {
    Earthquakes: EarthquakeMarkersLayer
    };

    // Created the map object with options
     // Map object is centered on the US
     const myMap = L.map("map_test", {
      center: [39.8283, -98.5795],
      zoom: 4,
      layers: [light, EarthquakeMarkersLayer]
    });

    // Created a layer control, pass in the baseMaps and overlayMaps. Added the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(myMap);

}

// Created a createMarkers function to generate the circles
function createMarkers2(response){
    console.log('["createMarkers"] response: ', response);
    // Pulled the earthquakes & properties off of response.features
    let coordinates = response.coordinates;
    console.log(coordinates);

    // Initialized an array to hold earthquake markers
    let earthquakeMarkers = [];

    // Looped through the earthquakes array and create a circle marker for each earthquake object
    coordinates.forEach((coordinate) => {

    // Added circles to the array
    let earthquakeMarker =
        L.circle([coordinate[0], coordinate[1]], {
        fillOpacity: 0.85,
        color: "black",
        fillColor: "red",
        weight: 1,
        // Adjusted radius according to magnitude and made popups
        radius: 500,
        }).push(earthquakeMarker);

    });

    // Created a layer group made from the earthquakeMarkers array, passed it into the createMap function for the overlay
    let markersLayer = L.layerGroup(earthquakeMarkers);
    createMap2(markersLayer);
}

// Performed the API call to the USGS API to get earthquake information. Called createMarkers to start the process of building the map:
const url ='https://localhost:5000/coordinates';
d3.json(url).then(createMarkers2);