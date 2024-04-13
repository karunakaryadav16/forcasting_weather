import "./mapcomponents.css";
import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const MapContainer = (props) => {
  const [currentLocation, setCurrentLocation] = useState({ lat: null, lng: null });
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting the current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchInput)}&key=${props.google.maps.apiKey}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setSearchResult({ lat, lng });
      } else {
        console.error('No results found');
        setSearchResult(null);
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  return (
    <div className='map_parent_container'>
      <div className='map_parent_container'>
        <input
          type="text"
          placeholder="Enter location"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <Map google={props.google} zoom={14} initialCenter={currentLocation} style={{ width: '200px', height: '200px',textAlign :"center"}}>
        {currentLocation.lat && currentLocation.lng && (
          <Marker position={currentLocation} />
        )}
        {searchResult && (
          <Marker position={searchResult} />
        )}
        <InfoWindow onClose={() => setSelectedPlace(null)}>
          <div>
            <h1>{selectedPlace ? selectedPlace.name : 'Current location'}</h1>
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
};

const apiKey = "AIzaSyAetg_cPDdsVb5xihO-6GUtqLMU2S6GLGk";

export default GoogleApiWrapper({
  apiKey: apiKey
})(MapContainer);














































































































