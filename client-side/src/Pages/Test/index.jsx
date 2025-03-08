import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 12.8230,
  lng: 80.0444,
};

const App = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg",
    libraries: ['places'],
  });

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (isLoaded) {
      nearbySearch();
    }
  }, [isLoaded]);

  const nearbySearch = async () => {
    const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary("places");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const request = {
      fields: ["displayName", "location", "businessStatus", "formattedAddress", "rating", "userRatingCount", "types"],
      locationRestriction: {
        center: center,
        radius: 2000,
      },
      includedPrimaryTypes: ["hotel"],
      maxResultCount: 5,
      rankPreference: SearchNearbyRankPreference.POPULARITY,
      language: "en-US",
      region: "us",
    };

    const { places } = await Place.searchNearby(request);

    if (places.length) {
      setPlaces(places);
      // Print all details about the places
      places.forEach((place, index) => {
        console.log(`Place ${index + 1}:`, place);
      });
    } else {
      console.log("No results");
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div>
      <h1>Nearby Search with React and Google Maps</h1>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={center}
        mapId="DEMO_MAP_ID"
      >
        {places.map((place, index) => (
          <Marker
            key={index}
            position={place.location}
            title={place.displayName}
          />
        ))}
      </GoogleMap>

      {/* Display place details in the UI */}
      <div>
        <h2>Place Details:</h2>
        {places.map((place, index) => (
          <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <h3>{place.displayName}</h3>
            <p><strong>Address:</strong> {place.formattedAddress}</p>
            <p><strong>Business Status:</strong> {place.businessStatus}</p>
            <p><strong>Rating:</strong> {place.rating} ({place.userRatingCount} reviews)</p>
            <p><strong>Types:</strong> {place.types?.join(', ')}</p>
            <p><strong>Location:</strong> Lat: {place.location.lat()}, Lng: {place.location.lng()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;