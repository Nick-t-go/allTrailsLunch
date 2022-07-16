import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, Marker } from "@react-google-maps/api";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";

const MapContainer = ({
  center, onBoundsChanged, setCurrentMap, searchResults, showMap, selectedLocation, setSelectedLocation
}) => {
  const onLoad = useCallback(function callback(map) {
    setCurrentMap(map);
  }, []);

  const onLoadMarker = (marker, id) => {
    const customIcon = opts => Object.assign({
      path: faLocationPin.icon[4],
      fillColor: '#34495e',
      fillOpacity: 1,
      strokeColor: '#000',
      strokeWeight: 1,
      scale: 0.06,
    }, opts);

    marker.setIcon(customIcon({
      fillColor: id === selectedLocation ? '#4d8425' : 'grey',
      strokeColor: 'white'
    }));
  };


  return (
    <div className={`map-container ${!showMap ? 'hide' : ''}`}>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="google-map-container"
        onBoundsChanged={onBoundsChanged}
        onLoad={onLoad}
        options={{ disableDefaultUI: true }}
      >{searchResults.map(({ geometry, place_id: id }) => (
        <Marker
          position={geometry.location}
          onLoad={marker => onLoadMarker(marker, id)}
          onClick={() => setSelectedLocation(id)}
          clickable
          key={id}
        />
      ))}
      </GoogleMap>
    </div>
  );
};

MapContainer.propTypes = {
  center: PropTypes.object.isRequired,
  onBoundsChanged: PropTypes.func.isRequired,
  setCurrentMap: PropTypes.func.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.object),
  showMap: PropTypes.bool,
  selectedLocation: PropTypes.string,
  setSelectedLocation: PropTypes.func
};

export default MapContainer;