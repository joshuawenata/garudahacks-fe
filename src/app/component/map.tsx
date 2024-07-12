"use client";

import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaLocationArrow } from "react-icons/fa";
import EmergencyModel from "@/model/emergencyModel";
import FirebaseService from "@/services/firebase.service";
import { useSearchParams } from "next/navigation";

// Fix for the default icon issue with Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const Map = () => {
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);
  const mapRef = useRef<L.Map | null>(null);

  const [emergency, setEmergency] = useState<EmergencyModel>();
  const params = useSearchParams();
  const id = params.get("id");

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        return;
      }
      const data = await FirebaseService.getFirebase(id);
      if (data) {
        setEmergency(data);
        setPosition([
          parseFloat(data.latitude || "0"),
          parseFloat(data.longitude || "0"),
        ]);
        if (mapRef.current) {
          mapRef.current.setView(
            [
              parseFloat(data.latitude || "0"),
              parseFloat(data.longitude || "0"),
            ],
            13
          );
        }
      }
    };

    fetchData();
  }, []);

  const recenterToUserLocation = () => {
    setPosition([
      parseFloat(emergency?.latitude || "0"),
      parseFloat(emergency?.longitude || "0"),
    ]);
    if (mapRef.current) {
      mapRef.current.setView(
        [
          parseFloat(emergency?.latitude || "0"),
          parseFloat(emergency?.longitude || "0"),
        ],
        13
      );
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            You are here: <br /> Latitude: {position[0]} <br /> Longitude:{" "}
            {position[1]}
          </Popup>
        </Marker>
      </MapContainer>
      <button
        style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}
        onClick={recenterToUserLocation}
        className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full flex flex-row items-center justify-center"
      >
        <FaLocationArrow className="mr-2" />
        Re-Center
      </button>
    </div>
  );
};

export default Map;
