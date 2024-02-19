import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

const defaultCenter = [51.505, -0.09]; // Example coordinates, you can change this

function App() {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');

  const click = () => {
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
              <input
                type="text"
                id="startLocation"
                placeholder="Enter start location"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
              />
            </div>

            <div className="label-input">
              <label htmlFor="endLocation">End Location:</label>
              <input
                type="text"
                id="endLocation"
                placeholder="Enter end location"
                value={endLocation}
                onChange={(e) => setEndLocation(e.target.value)}
              />
            </div>
          </div>

          <button onClick={click} className="center-button">
            Find Path
          </button>

          <MapContainer center={defaultCenter} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Add markers or other map components here */}
            <Marker position={defaultCenter}>
              <Popup>
                A sample marker.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </header>
    </div>
  );
}

export default App;
