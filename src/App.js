import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';


const defaultCenter = [33.8704, -117.9242]; // Coordinates for Fullerton, you can change this
const locationsNearFullerton = [
  'Fullerton, CA',
  'Brea, CA',
  'Placentia, CA',
  'Anaheim, CA',
  'Yorba Linda, CA',
  // Add more locations as needed
];

function App() {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');

  const handleStartLocationChange = (e) => {
    setStartLocation(e.target.value);
  };

  const handleEndLocationChange = (e) => {
    setEndLocation(e.target.value);
  };

  const handleFindPathClick = () => {
    console.log('Start Location:', startLocation);
    console.log('End Location:', endLocation);
    // Add logic for finding the path or any other action here
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1 className="title">Quick Route</h1>

          <div className="location-inputs">
            <div className="label-input">
              <label htmlFor="startLocation">Start Location:</label>
              <select
                id="startLocation"
                value={startLocation}
                onChange={handleStartLocationChange}
              >
                <option value="">Select start location</option>
                {locationsNearFullerton.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div className="label-input">
              <label htmlFor="endLocation">End Location:</label>
              <select
                id="endLocation"
                value={endLocation}
                onChange={handleEndLocationChange}
              >
                <option value="">Select end location</option>
                {locationsNearFullerton.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button onClick={handleFindPathClick} className="center-button">
            Find Path
          </button>

          <MapContainer center={defaultCenter} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Add markers or other map components here */}
            <Marker position={defaultCenter}>
              <Popup>A sample marker.</Popup>
            </Marker>
          </MapContainer>
        </div>
      </header>
    </div>
  );
}

export default App;

