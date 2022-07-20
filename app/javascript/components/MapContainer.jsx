import React, {
  useCallback, useState, useEffect
} from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, Marker } from "@react-google-maps/api";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";

import useBrowserLocation from '../hooks/useBrowserLocation';
import CustomMarker from "./CustomMarker";
import { getCenterPlace } from "../helpers/api";

const MapContainer = ({
  onBoundsChanged, setCurrentMap, searchResults, showMap, selectedLocation, setSelectedLocation, currentMap
}) => {
  const [center, setCenter] = useState({ lat: 40.68, lng: -73.95 });
  const [centerLabel, setCenterLabel] = useState('');
  const onLoad = useCallback((map) => { setCurrentMap(map); }, []);
  useBrowserLocation(setCenter);

  const setMarker = (marker, selected) => {
    marker.setIcon({
      fillColor: selected ? '#4d8425' : 'grey',
      strokeColor: 'white',
      path: faLocationPin.icon[4],
      fillOpacity: 1,
      strokeWeight: 1,
      scale: 0.06,
    });
  };

  const setCenterMarker = (marker) => {
    marker.setIcon({
      path: faLocationPin.icon[4],
      scale: 0.00,
    });
  };

  const handleCenterChange = () => {
    if (!currentMap) return;
    setCenter(currentMap.getCenter().toJSON());
    // Hides label on
    setCenterLabel("");
  };

  useEffect(() => {
    if (!currentMap) return;
    getCenterPlace({ location: `${center.lat},${center.lng}` })
      .then(place => setCenterLabel(place.formatted_address.split(',')[0]))
      .catch(() => console.log('Error Getting Center Place'));
  }, [center, currentMap]);


  return (
    <div className={`map-container ${!showMap ? 'hide' : ''}`}>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="google-map-container"
        onBoundsChanged={onBoundsChanged}
        onDragEnd={handleCenterChange}
        onZoomChanged={handleCenterChange}
        onLoad={onLoad}
        options={{ disableDefaultUI: true }}
      >{searchResults.map(place => (
        <CustomMarker
          place={place}
          selected={place.place_id === selectedLocation}
          setMarker={setMarker}
          setSelectedLocation={setSelectedLocation}
          key={place.place_id}
        />
      ))}
        <Marker
          label={centerLabel}
          position={center}
          onLoad={marker => setCenterMarker(marker)}
        />
      </GoogleMap>
    </div>
  );
};

MapContainer.propTypes = {
  onBoundsChanged: PropTypes.func.isRequired,
  setCurrentMap: PropTypes.func.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.object),
  showMap: PropTypes.bool,
  selectedLocation: PropTypes.string,
  setSelectedLocation: PropTypes.func,
  currentMap: PropTypes.object
};

export default MapContainer;
