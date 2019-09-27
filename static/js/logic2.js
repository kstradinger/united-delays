// Created function to generate base map 
function createMap2(HubMarkersLayer) {
    console.log(HubMarkersLayer);
    // Created a baseMaps object to hold the lightmap and darkmap layer
    // Defined variables for tile layers
    const streets = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: attribution,
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API_KEY
    });
    const outdoors = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: attribution,
        maxZoom: 18,
        id: "mapbox.outdoors",
        accessToken: API_KEY
    });
    // Only one base layer can be shown at a time
    const baseMaps = {
        Streets: streets,
        Outdoors: outdoors
    };
    // Create an overlayMaps object to hold the earthquake data layer
    // This creates overlays that may be toggled on or off
    // Created the map object with options
    // Map object is centered on the US
    const myMap = L.map("map_test", {
        center: [39.8283, -98.5795],
        zoom: 4,
        layers: [streets]
        // layers: [streets, HubMarkersLayer]
    });
    // Created a layer control, pass in the baseMaps. created a library to add the overlays after load.
    let controlLayer= L.control.layers(baseMaps, null, { collapsed: false }).addTo(myMap);
    return {
        myMap:myMap,
        controlLayer:controlLayer
    };
}
// Created a createMarkers function to generate the hub locations
function createMarkers2(response,mapInfo) {
    // console.log("createMarkers2!");
    // console.log('["createMarkers2"] response: ', response);
    // Pulled the hubs & properties off of response.coordinates
    let coordinates = response.coordinates;
    // console.log(coordinates);
    // Initialized an array to hold airport markers
    let hubMarkers = [];
    
    // Defined properties of the airport icons
    var myIcon = L.icon({
        iconUrl: 'static/images/airplane.png',
        iconSize: [30, 30]
    });
    // Looped through the coordinates array and created a airplane marker for each airport object
    coordinates.forEach((coordinate) => {
        // Added airplane markers to the array
        let hubMarker =
            L.marker([coordinate[0], coordinate[1]], {icon:myIcon})
            .bindPopup("<h5><center>Hub: " + coordinate[3] + "</center><h5><h5><center>IATA Code: " +coordinate[2] + "</center><h5>");;
            hubMarkers.push(hubMarker);
    });
    // Created a layer group made from the hubMarkers array, added layer to the map and defaulted on for layer control
    let markersLayer = L.layerGroup(hubMarkers);
    mapInfo.myMap.addLayer(markersLayer);
    mapInfo.controlLayer.addOverlay(markersLayer,"Hubs");
    
};
    
// Created a createPaths function to generate the flight paths
function createPaths(response, mapInfo) {
    // console.log("createPaths!");
    // console.log('["createPaths"] response: ', response);
    // Pulled the hubs & properties off of response.coordinates
    let coordinates = response.coordinates;
    // console.log(coordinates);
    // Used coordinate data to initialize build out of geodesic routes
    // Initialized an array to hold airport coords
    let hubCoords=[]
    coordinates.forEach((coordinate) =>{
        hubCoords.push([coordinate[0], coordinate[1]])
    });
    // console.log(hubCoords);
    // Formated lat lngs for Geodesic 
    let hubLatLng =[];
    hubCoords.forEach((coordinate) =>{
        hubLatLng.push({
            lat: parseFloat(coordinate[0]),
            lng: parseFloat(coordinate[1])
        });
    });
    // console.log(hubLatLng);
    // Iterated through duped pair arrays to generate coordinate pairs between cities 
    let hubLatLng1 = hubLatLng;
    let latLngPairs=[]
    
    for (var i = 0; i < hubLatLng.length; i++){
    for (var j = 0; j < hubLatLng1.length; j++){
        latLngPairs.push([hubLatLng[i], hubLatLng1[j]]);
    }}
    // console.log(latLngPairs);
    // Initialized an array for geodesic routes
    let flightPaths=[]
    let geodesicPath= 
            L.geodesic(latLngPairs, {
                weight:2,
                opacity:1,
                color: "blue",
                steps: 500 
            })
        flightPaths.push(geodesicPath);
    // console.log(flightPaths);
    // Created a layer group made from the flight paths array, added layer to the map and defaulted on for layer control
    let pathsLayer = L.layerGroup(flightPaths);
    // mapInfo.myMap.addLayer(pathsLayer);
    mapInfo.controlLayer.addOverlay(pathsLayer,"Routes");
}
// Created base map. Performed the API call to get hub coordinates off our /coordinates route. Called createPaths and createMarkers to generate overlays.
let mapInfo= createMap2();
const url2 = '/coordinates';
d3.json(url2).then(response =>{
    createPaths(response, mapInfo);
});
d3.json(url2).then(response =>{
    createMarkers2(response, mapInfo);
});