import React, { useState } from 'react';
import { useLoadScript } from "@react-google-maps/api";

import useBrowserLocation from '../hooks/useBrowserLocation';
import usePlacesService from '../hooks/usePlacesService';
import SearchHeader from './SearchHeader';
import PlacesList from './PlacesList';
import MapContainer from './MapContainer';

const libraries = ["places"];

const App = () => {
  const [center, setCenter] = useState({ lat: 40.68, lng: -73.95 });
  const [currentMap, setCurrentMap] = useState(null);
  const [currentBounds, setCurrentBounds] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showMap, setShowMap] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [sortValue, setSortValue] = useState(null);
  const findPlacesFromQuery = usePlacesService(currentMap, currentBounds, setSearchResults);

  useBrowserLocation(setCenter);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_API_KEY,
    libraries
  });

  if (!isLoaded) return <div> Google Maps is Loading </div>;

  const onBoundsChanged = () => {
    if (currentMap.getBounds) {
      setCurrentBounds(currentMap.getBounds().toJSON());
    }
  };

  const onClickShow = () => {
    setShowMap(!showMap);
  };

  return (
    <div className="app-container">
      <SearchHeader
        findPlacesFromQuery={findPlacesFromQuery}
        searchResultsAvailable={searchResults.length !== 0}
        sortValue={sortValue}
        setSortValue={setSortValue}
      />
      <section className="map-results-section">
        <PlacesList
          searchResults={searchResults}
          showPlaceList={!showMap}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          sortValue={sortValue}
        />
        <MapContainer
          center={center}
          onBoundsChanged={onBoundsChanged}
          setCurrentMap={setCurrentMap}
          searchResults={searchResults}
          showMap={showMap}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
        <button type="button" onClick={onClickShow} className="show-button">
          {showMap
            ? <span><i className="fa fa-map-marker" aria-hidden="true" />List</span>
            : <span><i className="fa fa-list" aria-hidden="true" />Map </span>
        }
        </button>
      </section>
    </div>
  );
};

export default App;
