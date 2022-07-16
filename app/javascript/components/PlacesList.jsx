import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

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

  const determineStar = (rating, starNumber) => {
    if (rating > starNumber) return 'fa-solid fa-star';
    if (rating < starNumber && rating > starNumber - 1) return 'fa-star-half-o';
    return 'fa-duotone fa-star';
  };

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
      {sortedSearchResults.map(({
        place_id: id, photos, name, rating, price_level: priceLvl, vicinity, user_ratings_total: ratingTotal
      }) => (
        <div
          className={`result-card ${id === selectedLocation ? 'selected' : ''}`}
          key={id}
          onClick={() => handleLocationClick(id)}
          onKeyDown={() => handleLocationClick(id)}
          tabIndex="0"
          role="button"
          aria-pressed="false"
        >
          <img
            className="result-img"
            width="64"
            height="64"
            alt="result-place"
            src={photos && photos[0] ? photos[0].getUrl() : 'https://picsum.photos/id/1/200/300'}
          />
          <div className="info-container">
            <h3>{name}</h3>
            <div className="stars-container">
              {[1, 2, 3, 4, 5].map(num => <i className={`fa ${determineStar(rating, num)}`} key={num} />)}
              {`(${ratingTotal})`}
            </div>
            <div className="description-container">{`${'$'.repeat(priceLvl)} • ${vicinity}`}</div>
          </div>
          <div
            className="heart-container"
            onClick={e => handleFavoriteCLick(e, id)}
            onKeyDown={e => handleFavoriteCLick(e, id)}
            tabIndex="0"
            role="button"
            aria-pressed="false"
          >
            {favorites.includes(id) ? <i className="fa fa-solid fa-heart" /> : <i className="fa fa-heart-o" />}
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
