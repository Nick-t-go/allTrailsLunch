import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import PlaceDescription from './PlaceDescription';

const PlacesList = ({
  searchResults, showPlaceList, selectedLocation, setSelectedLocation, sortValue
}) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('mapFavorites');
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  useEffect(() => {
    localStorage.setItem("mapFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleLocationClick = (id) => {
    setSelectedLocation(id);
  };

  const handleFavoriteCLick = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const index = favorites.indexOf(id);
    if (index !== -1) {
      setFavorites([
        ...favorites.slice(0, index),
        ...favorites.slice(index + 1)
      ]);
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const sortedSearchResults = useMemo(() => {
    const values = !sortValue ? searchResults : searchResults.sort((a, b) => {
      if (sortValue === 'high') {
        return b.rating - a.rating;
      }
      return a.rating - b.rating;
    });
    return values;
  }, [searchResults, sortValue]);

  return (
    <div className={`places-list ${!showPlaceList ? 'hide' : ''}`}>
      {sortedSearchResults.map(place => (
        <div
          className={`result-card ${place.place_id === selectedLocation ? 'selected' : ''}`}
          key={place.place_id}
          onClick={() => handleLocationClick(place.place_id)}
          onKeyDown={() => handleLocationClick(place.place_id)}
          tabIndex="0"
          role="button"
          aria-pressed="false"
        >
          <PlaceDescription place={place} />
          <div
            className="heart-container"
            onClick={e => handleFavoriteCLick(e, place.place_id)}
            onKeyDown={e => handleFavoriteCLick(e, place.place_id)}
            tabIndex="0"
            role="button"
            aria-pressed="false"
          >
            {favorites.includes(place.place_id) ? <i className="fa fa-solid fa-heart" /> : <i className="fa fa-heart-o" />}
          </div>
        </div>
      ))}
    </div>
  );
};

PlacesList.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.object),
  showPlaceList: PropTypes.bool,
  selectedLocation: PropTypes.string,
  setSelectedLocation: PropTypes.func,
  sortValue: PropTypes.string
};

export default PlacesList;
