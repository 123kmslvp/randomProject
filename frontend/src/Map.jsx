import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const [status, setStatus] = useState("Finding your location...");

  useEffect(() => {
    if (mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView([0, 0], 13);
    mapInstanceRef.current = map;

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);

    async function loadPlaces(lat, lng) {
      setStatus("Loading nearby cafes and boba shops...");

      const query = `
[out:json][timeout:25];
(
  node["amenity"="cafe"](around:5000,${lat},${lng});
  way["amenity"="cafe"](around:5000,${lat},${lng});
  relation["amenity"="cafe"](around:5000,${lat},${lng});

  node["cuisine"~"bubble_tea", i](around:5000,${lat},${lng});
  way["cuisine"~"bubble_tea", i](around:5000,${lat},${lng});
  relation["cuisine"~"bubble_tea", i](around:5000,${lat},${lng});

  node["shop"="tea"](around:5000,${lat},${lng});
  way["shop"="tea"](around:5000,${lat},${lng});
  relation["shop"="tea"](around:5000,${lat},${lng});

  node["shop"="coffee"](around:5000,${lat},${lng});
  way["shop"="coffee"](around:5000,${lat},${lng});
  relation["shop"="coffee"](around:5000,${lat},${lng});
);
out center;
`;

      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query,
      });

      const text = await response.text();

      if (!response.ok) {
        console.error("Overpass error:", text);
        throw new Error("Failed to fetch nearby places");
      }

      const data = JSON.parse(text);

      markersLayerRef.current.clearLayers();

      L.marker([lat, lng])
        .addTo(markersLayerRef.current)
        .bindPopup("You are here")
        .openPopup();

      if (!data.elements || data.elements.length === 0) {
        setStatus("No cafes or boba shops found nearby.");
        return;
      }

      const seen = new Set();
      let count = 0;

      data.elements.forEach((place) => {
        const placeLat = place.lat ?? place.center?.lat;
        const placeLng = place.lon ?? place.center?.lon;

        if (placeLat == null || placeLng == null) return;

        const name = place.tags?.name || "Unnamed place";
        const key = `${name}-${placeLat}-${placeLng}`;

        if (seen.has(key)) return;
        seen.add(key);

        const cuisine = place.tags?.cuisine || "";
        const shop = place.tags?.shop || "";
        const amenity = place.tags?.amenity || "";

        let label = name;

        if (/bubble_tea/i.test(cuisine)) {
          label += "<br/>Bubble tea";
        } else if (shop === "tea") {
          label += "<br/>Tea shop";
        } else if (shop === "coffee" || amenity === "cafe") {
          label += "<br/>Cafe";
        }

        L.marker([placeLat, placeLng])
          .addTo(markersLayerRef.current)
          .bindPopup(label);

        count += 1;
      });

      setStatus(`Found ${count} nearby places.`);
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        map.setView([lat, lng], 15, { animate: false });

        loadPlaces(lat, lng).catch((err) => {
          console.error(err);
          setStatus("Could not load nearby cafes and boba shops.");
        });
      },
      (error) => {
        console.error("Location error:", error);
        setStatus("Location access was denied or unavailable.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div>
      <p>{status}</p>
      <div ref={mapRef} style={{ height: "450px", width: "100%" }} />
    </div>
  );
}