import React, { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

import PropTypes from 'prop-types';
import SortMenu from './SortMenu';
import AllTrailsLogo from '../assets/AllTrailsLogo';

const SearchHeader = ({
  findPlacesFromQuery, searchResultsAvailable, sortValue, setSortValue
}) => {
  const [searchString, setSearchString] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const onInputChange = e => setSearchString(e.target.value);

  const debouncedCall = useCallback(
    debounce((searchInput) => { findPlacesFromQuery(searchInput); }, 5000), [findPlacesFromQuery]
  );

  useEffect(() => {
    if (searchString) {
      debouncedCall(searchString);
    }
  }, [searchString, findPlacesFromQuery]);

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
          <input type="text" className="search-input" placeholder="search" onChange={onInputChange} value={searchString} />
          <button className="search-button" type="submit"><i className="fa fa-search" /></button>
        </div>
      </div>
    </header>
  );
};

SearchHeader.propTypes = {
  findPlacesFromQuery: PropTypes.func,
  searchResultsAvailable: PropTypes.bool,
  sortValue: PropTypes.string,
  setSortValue: PropTypes.func
};


export default SearchHeader;
