import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Marker, InfoWindow } from "@react-google-maps/api";

import PlaceDescription from "./PlaceDescription";

const CustomMarker = ({
  place, selected, setSelectedLocation, setMarker
}) => {
  const markerRef = useRef();

  useEffect(() => {
    if (markerRef.current) {
      setMarker(markerRef.current.marker, selected);
    }
  }, [selected, markerRef.current]);


  return (
    <Marker
      ref={markerRef}
      position={place.geometry.location}
      onLoad={marker => setMarker(marker, selected)}
      onClick={() => setSelectedLocation(place.place_id)}
      clickable
      key={place.place_id}
    >
      {selected
        ? (
          <InfoWindow position={place.geometry.location}>
            <div className="info-window-container">
              <PlaceDescription place={place} />
            </div>
          </InfoWindow>
        )
        : null }
    </Marker>
  );
};

CustomMarker.propTypes = {
  place: PropTypes.object,
  setMarker: PropTypes.func,
  selected: PropTypes.bool,
  setSelectedLocation: PropTypes.func
};

export default CustomMarker;
