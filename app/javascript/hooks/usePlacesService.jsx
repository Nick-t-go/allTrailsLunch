import { useCallback } from 'react';

const usePlacesService = (currentMap, bounds, setResults) => useCallback((keyword) => {
  if (!currentMap || !bounds) return [];
  const placesService = new window.google.maps.places.PlacesService(currentMap);
  const request = {
    type: ['restaurant'],
    bounds
  };
  placesService.nearbySearch({ ...request, keyword }, (result, status) => {
    if (status === "OK") setResults(result);
  });
}, [currentMap, bounds]);

export default usePlacesService;
