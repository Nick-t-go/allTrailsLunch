import React, { useState } from 'react';

import PropTypes from 'prop-types';
import SortMenu from './SortMenu';
import AllTrailsLogo from '../assets/AllTrailsLogo';

const SearchHeader = ({
  searchString, onSearchInputChange, searchResultsAvailable, sortValue, setSortValue, getPlaces
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => setShowMenu(!showMenu);

  return (
    <header className="search-header">
      <div className="title-container">
        <AllTrailsLogo />
        <div className="app-title">at Lunch</div>
      </div>
      <div className="search-bar-container">
        <div className="filter-button-container">
          <button type="button" className="filter-button" disabled={!searchResultsAvailable} onClick={handleShowMenu}>Sort</button>
          {showMenu ? <SortMenu setSortValue={setSortValue} sortValue={sortValue} setShowMenu={setShowMenu} /> : null }
        </div>
        <div className="form-group search">
          <input type="text" className="search-input" placeholder="search" onChange={onSearchInputChange} value={searchString} />
          <button className="search-button" type="submit" onClick={() => getPlaces(searchString)}><i className="fa fa-search" /></button>
        </div>
      </div>
    </header>
  );
};

SearchHeader.propTypes = {
  searchResultsAvailable: PropTypes.bool,
  sortValue: PropTypes.string,
  setSortValue: PropTypes.func,
  onSearchInputChange: PropTypes.func,
  searchString: PropTypes.string,
  getPlaces: PropTypes.func,
};


export default SearchHeader;
