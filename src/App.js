import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

const defaultCenter = [33.8704, -117.9242]; // Coordinates for Fullerton, you can change this
const locationsNearFullerton = [
  { name: 'Fullerton, CA', coordinates: [33.8704, -117.9242] },
  { name: 'Brea, CA', coordinates: [33.9165, -117.9003] },
  { name: 'Placentia, CA', coordinates: [33.8722, -117.8703] },
  { name: 'Anaheim, CA', coordinates: [33.8366, -117.9143] },
  { name: 'Yorba Linda, CA', coordinates: [33.8886, -117.8131] },
  // Add more locations as needed
];

function App() {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [shortestPath, setShortestPath] = useState([]);

  useEffect(() => {
    const calculateShortestPath = () => {
      const graph = [
        [0, 5, 10, -1, -1],
        [5, 0, -1, 15, -1],
        [10, -1, 0, -1, 20],
        [-1, 15, -1, 0, 25],
        [-1, -1, 20, 25, 0],
      ];

      const startIndex = locationsNearFullerton.findIndex((location) => location.name === startLocation);
      const endIndex = locationsNearFullerton.findIndex((location) => location.name === endLocation);

      const dist = floydWarshallAlgorithm(graph);
      const path = getShortestPath(startIndex, endIndex, dist);
      setShortestPath(path);
    };

    calculateShortestPath();
  }, [startLocation, endLocation]);

  const handleStartLocationChange = (e) => {
    setStartLocation(e.target.value);
  };

  const handleEndLocationChange = (e) => {
    setEndLocation(e.target.value);
  };

  const handleFindPathClick = () => {
    console.log('Start Location:', startLocation);
    console.log('End Location:', endLocation);
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
                  <option key={index} value={location.name}>
                    {location.name}
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
                  <option key={index} value={location.name}>
                    {location.name}
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

            {shortestPath.length > 0 && (
              <Polyline
                positions={shortestPath.map((index) => locationsNearFullerton[index].coordinates)}
                color="blue"
              />
            )}

            {locationsNearFullerton.map((location, index) => (
              <Marker key={index} position={location.coordinates}>
                <Popup>{location.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </header>
    </div>
  );
}

function floydWarshallAlgorithm(graph) {
  const numNodes = graph.length;
  const dist = [...graph.map(row => [...row])];

  for (let k = 0; k < numNodes; k++) {
    for (let i = 0; i < numNodes; i++) {
      for (let j = 0; j < numNodes; j++) {
        if (dist[i][k] !== -1 && dist[k][j] !== -1) {
          dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
        }
      }
    }
  }

  return dist;
}

function getShortestPath(startIndex, endIndex, distances) {
  const path = [];
  let current = startIndex;

  while (current !== endIndex) {
    path.push(current);
    for (let next = 0; next < distances.length; next++) {
      if (next !== current && distances[current][next] + distances[next][endIndex] === distances[current][endIndex]) {
        current = next;
        break;
      }
    }
  }

  path.push(endIndex);
  return path;
}

export default App;
