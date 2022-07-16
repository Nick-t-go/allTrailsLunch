import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const SortMenu = ({
  sortValue, setSortValue, setShowMenu
}) => {
  const [localSelection, setLocalSelection] = useState(sortValue);
  const ref = useRef(null);
  const close = () => setShowMenu(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        close();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const handleSortSelection = (e) => {
    if (localSelection === e.target.value) return setLocalSelection(null);
    setLocalSelection(e.target.value);
  };

  const applySelection = () => {
    setSortValue(localSelection);
    close();
  };


  return (
    <div className="filter-menu" ref={ref}>
      <label className="container">Ratings High to Low
        <input type="checkbox" value="high" checked={localSelection === 'high'} onChange={handleSortSelection} />
        <span className="checkmark" />
      </label>
      <label className="container">Ratings Low to Hide
        <input type="checkbox" value="low" checked={localSelection === 'low'} onChange={handleSortSelection} />
        <span className="checkmark" />
      </label>
      <button type="button" className="apply-button" onClick={applySelection}>Apply</button>
    </div>
  );
};

SortMenu.propTypes = {
  sortValue: PropTypes.string,
  setSortValue: PropTypes.func,
  setShowMenu: PropTypes.func
};

export default SortMenu;
