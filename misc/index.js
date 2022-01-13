if (document.getElementById("map")) {
    mapboxgl.accessToken =
        "pk.eyJ1Ijoic3RhcnRvbGVmdCIsImEiOiJjamtmcnhwdGIwYnR6M3NxbjR3cTBvdThjIn0.fihE9-g-sm0dgoMksATtUw";
    const map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/streets-v11",
        center: [14.208328809133434, 57.65571605834185],
        pitch: 0,
        bearing: 0,
        zoom: 4.65,
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
            .setLngLat([11.973418561594144, 57.70110534205301])
            .addTo(map);

        const halmstad = new mapboxgl.Marker({
            color: "red",
            draggable: true,
        })
            .setLngLat([12.858726218404627, 56.675243994602994])
            .addTo(map);

        const stockholm = new mapboxgl.Marker({
            color: "red",
            draggable: true,
        })
            .setLngLat([18.085704896787774, 59.33476825913999])
            .addTo(map);
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
}

// Handle sticky navbar
var navbar = document.getElementById("navbar");
var navbarLogo = document.getElementById("navbar-logo");
window.onscroll = function () {
    if (window.pageYOffset >= 40) {
        navbar.classList.add("navbar-small");
        navbarLogo.classList.remove("header-logo-container");
        navbarLogo.classList.add("header-logo-container-small");
    } else {
        navbar.classList.remove("navbar-small");
        navbarLogo.classList.add("header-logo-container");
        navbarLogo.classList.remove("header-logo-container-small");
    }
};
