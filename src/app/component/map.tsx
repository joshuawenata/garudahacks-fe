"use client";

import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for the default icon issue with Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Map = () => {
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], 13);
          }
        },
        (error) => {
          console.error(error);
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const recenterToUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], 13);
          }
        },
        (error) => {
          console.error(error);
        },
        { enableHighAccuracy: true }
      );
    }
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            You are here: <br /> Latitude: {position[0]} <br /> Longitude: {position[1]}
          </Popup>
        </Marker>
      </MapContainer>
      <button
        style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}
        onClick={recenterToUserLocation}
        className='bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full'
      >
        Re-center to My Location
      </button>
    </div>
  );
};

export default Map;
