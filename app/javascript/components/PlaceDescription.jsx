import React from 'react';
import PropTypes from 'prop-types';

const PlaceDescription = ({ place }) => {
  const {
    photos, name, rating, price_level: priceLvl, vicinity, user_ratings_total: ratingTotal
  } = place;

  const determineStar = (starNumber) => {
    if (rating > starNumber) return 'fa-duotone fa-star';
    if (rating < starNumber && rating > starNumber - 1) return 'fa-star-half-o';
    return 'fa-star-o';
  };

  return (
    <div className="place-description">
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
          {[1, 2, 3, 4, 5].map(num => <i className={`fa ${determineStar(num)}`} key={num} />)}
          {`(${ratingTotal})`}
        </div>
        <div className="description-container">{`${'$'.repeat(priceLvl)} • ${vicinity}`}</div>
      </div>

    </div>
  );
};

PlaceDescription.propTypes = {
  place: PropTypes.object
};

export default PlaceDescription;
