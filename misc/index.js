mapboxgl.accessToken =
    "pk.eyJ1Ijoic3RhcnRvbGVmdCIsImEiOiJjamtmcnhwdGIwYnR6M3NxbjR3cTBvdThjIn0.fihE9-g-sm0dgoMksATtUw";
const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: [11.9743768, 57.6905535], // starting position
    pitch: 45,
    bearing: -17.6,
    zoom: 16, // starting zoom
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
            minzoom: 9,
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
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
