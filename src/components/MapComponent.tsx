import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import customIcon from "../assets/Icon/MarkerIcon.png";
interface MapComponentProps {
    details: {
        lat: number;
        lng: number;
    } | null;
    shipment: {
        departureName: string;
    };
}

const MapComponent: React.FC<MapComponentProps> = ({ details, shipment }) => {
    const [userLocation, setUserLocation] = useState<LatLngExpression | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        if (details) {
            const lat = details.lat;
            const lng = details.lng;
            setUserLocation([lat, lng]);
        } else {
            setErrorMessage("Location data is missing or incorrect.");
        }
    }, [details]);

    const customMarkerIcon = L.icon({
        iconUrl: customIcon, 
        iconSize: [32, 32], 
        iconAnchor: [16, 32], 
        popupAnchor: [0, -32],
    });

    return (
        <div style={{ textAlign: "center", margin: "20px" }}>
            <h1>Geolocation Map</h1>

            {errorMessage && (
            <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
            )}

            {userLocation ? (
            <MapContainer
                center={userLocation} 
                zoom={13} 
                style={{ width: "100%", height: "40rem", zIndex: "1" }}
            >
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                />
                <Marker position={userLocation} icon={customMarkerIcon}>
                <Popup>Shipment Location</Popup>
                </Marker>
            </MapContainer>
            ) : (
            <p>Loading map...</p>
            )}
        </div>
    );
};

export default MapComponent;
