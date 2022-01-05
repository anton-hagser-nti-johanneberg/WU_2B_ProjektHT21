mapboxgl.accessToken =
    "pk.eyJ1Ijoic3RhcnRvbGVmdCIsImEiOiJjamtmcnhwdGIwYnR6M3NxbjR3cTBvdThjIn0.fihE9-g-sm0dgoMksATtUw";
const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: [14.208328809133434, 57.65571605834185], // starting position
    pitch: 1,
    bearing: -11.56404140660961,
    zoom: 5.1065697131145065, // starting zoom
});

map.on("load", () => {
    const layers = map.getStyle().layers;
    const labelLayerId = layers.find(
        (layer) => layer.type === "symbol" && layer.layout["text-field"]
    ).id;

    map.addLayer(
        {
            id: "add-3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 12,
            paint: {
                "fill-extrusion-color": "#aaa",
                "fill-extrusion-height": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    15,
                    0,
                    15.05,
                    ["get", "height"],
                ],
                "fill-extrusion-base": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    15,
                    0,
                    15.05,
                    ["get", "min_height"],
                ],
                "fill-extrusion-opacity": 0.4,
            },
        },
        labelLayerId
    );

    const gothenburg = new mapboxgl.Marker({
        color: "red",
        draggable: true,
    })
        .setLngLat([11.9711353, 57.7011121])
        .addTo(map);

    const halmstad = new mapboxgl.Marker({
        color: "red",
        draggable: true,
    })
        .setLngLat([12.8567559, 56.6752514])
        .addTo(map);

    const stockholm = new mapboxgl.Marker({
        color: "red",
        draggable: true,
    })
        .setLngLat([18.083367, 59.3347249])
        .addTo(map);
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// Handle sticky navbar
var navbar = document.getElementById("navbar");
window.onscroll = function () {
    if (window.pageYOffset >= 50) {
        navbar.classList.add("navbar-small");
    } else {
        navbar.classList.remove("navbar-small");
    }
};
