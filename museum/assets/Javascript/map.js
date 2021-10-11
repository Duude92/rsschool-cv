mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2V5MDcwMyIsImEiOiJja3VrMG55bHozM2dyMnVtb25tYXF2YTRnIn0.tT-gIguccIT1rI2He_wJEQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [2.3364, 48.86091],
    zoom: 16
});
const marker1 = new mapboxgl.Marker({ color: 'black', rotation: 0 })
    .setLngLat([2.3364, 48.86091])
    .addTo(map);
// Create a default Marker and add it to the map.
const marker2 = new mapboxgl.Marker({ color: 'grey', rotation: 0 })
    .setLngLat([2.3333, 48.8602])
    .addTo(map);

// Create a default Marker, colored black, rotated 45 degrees.
const marker3 = new mapboxgl.Marker({ color: 'grey', rotation: 0 })
    .setLngLat([2.3397, 48.8607])
    .addTo(map);

// Create a default Marker, colored black, rotated 45 degrees.
const marker4 = new mapboxgl.Marker({ color: 'grey', rotation: 0 })
    .setLngLat([2.3330, 48.8619])
    .addTo(map);

// Create a default Marker, colored black, rotated 45 degrees.
const marker5 = new mapboxgl.Marker({ color: 'grey', rotation: 0 })
    .setLngLat([2.3365, 48.8625])
    .addTo(map);

map.addControl(new mapboxgl.NavigationControl());