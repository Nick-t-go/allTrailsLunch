import axiosRoot from 'axios';
import debounce from 'lodash.debounce';

const axios = axiosRoot.create({
  baseURL: 'http://localhost:3000/map',
  timeout: 10000
});

const headers = {
  Accept: 'application/json'
};


async function getNearbyPlaces(params, setSearchResults) {
  try {
    const nearbyPlaces = await axios.get('/nearby', { params, headers });
    setSearchResults(nearbyPlaces.data);
  } catch (err) {
    console.log('API Error');
    setSearchResults([]);
  }
}

async function getCenterPlace(params) {
  try {
    const response = await axios.get('/center_place', { params, headers });
    return response.data;
  } catch (err) {
    console.log('API Error');
  }
}

const getNearbyDebounced = debounce(
  (params, setSearchResults) => { getNearbyPlaces(params, setSearchResults); }, 1500
);

export { getNearbyDebounced, getCenterPlace };
