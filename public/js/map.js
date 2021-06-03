mapboxgl.accessToken = 'pk.eyJ1IjoibmlzaGFudC1iaGFyd2FuaSIsImEiOiJja3BlMDQybWIxbjJ3MnJsbGVhcDV2aHJwIn0.Ds7GOLL0rc7SiQj1kz4Fqw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 1,
});

console.log(latitude, longitude);

var marker = new mapboxgl.Marker()
    .setLngLat([longitude, latitude])
    .addTo(map);

// Set options
var marker = new mapboxgl.Marker({
        color: "#333",
        draggable: false
    }).setLngLat([longitude, latitude])
    .addTo(map);