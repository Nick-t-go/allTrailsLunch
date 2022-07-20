import React, { useState, useEffect } from 'react';
import { useLoadScript } from "@react-google-maps/api";

import { getNearbyDebounced } from '../helpers/api';

import SearchHeader from './SearchHeader';
import PlacesList from './PlacesList';
import MapContainer from './MapContainer';

// import usePlacesService from '../hooks/usePlacesService';

const libraries = ["places", "geometry"];

const App = () => {
  const [currentMap, setCurrentMap] = useState(null);
  const [currentBounds, setCurrentBounds] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showMap, setShowMap] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [sortValue, setSortValue] = useState(null);
  const [searchString, setSearchString] = useState('');
  // Front End Usage of Google Places API
  // const findPlacesFromQuery = usePlacesService(currentMap, currentBounds, setSearchResults);


  const handleSearch = () => {
    if (currentBounds && searchString) {
      const currentCenter = currentMap.getCenter();
      const northEast = currentBounds.getNorthEast();
      const radius = window.google.maps.geometry.spherical.computeDistanceBetween(currentCenter, northEast);
      getNearbyDebounced({ keyword: searchString, location: currentCenter, radius }, setSearchResults);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [currentBounds, searchString]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_API_KEY,
    libraries
  });

  if (!isLoaded) return <div> Google Maps is Loading </div>;

  const onBoundsChanged = () => {
    if (currentMap.getBounds) {
      setCurrentBounds(currentMap.getBounds());
    }
  };

  const onClickShow = () => {
    setShowMap(!showMap);
  };

  const onSearchInputChange = e => setSearchString(e.target.value);

  return (
    <div className="app-container">
      <SearchHeader
        onSearchInputChange={onSearchInputChange}
        searchResultsAvailable={searchResults.length !== 0}
        sortValue={sortValue}
        setSortValue={setSortValue}
        searchSting={searchString}
        getPlaces={handleSearch}
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
          onBoundsChanged={onBoundsChanged}
          setCurrentMap={setCurrentMap}
          searchResults={searchResults}
          showMap={showMap}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          currentMap={currentMap}
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
