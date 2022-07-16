import { useEffect } from 'react';

const useBrowserLocation = (setCenter) => {
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      console.log('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter(
          {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        );
      }, () => {
        console.log('Unable to retrieve your location');
      });
    }
  }, []);
};

export default useBrowserLocation;
