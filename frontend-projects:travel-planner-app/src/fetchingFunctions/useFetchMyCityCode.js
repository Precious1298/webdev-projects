import { useState, useEffect } from 'react';
import getAccessToken from './getAccessToken';

export default function useFetchMyCityCode() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  const [myCityCode, setMyCityCode] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => {
          setLocation({
            latitude: null,
            longitude: null,
            error: error.message,
          });
        }
      );
    } else {
      setLocation({
        latitude: null,
        longitude: null,
        error: 'Geolocation is not supported by this browser',
      });
    }
  };

  useEffect(function () {
    async function fetchMyLocation() {
      if (!location.latitude || !location.longitude) return;
      try {
        const token = await getAccessToken();
        const response = await fetch(
          `https://test.api.amadeus.com/v1/reference-data/locations/airports?latitude=${location.latitude}&longitude=${location.longitude}&radius=100`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch Destination data');
        }
        const result = await response.json();
        setMyCityCode(result.data[0].address.cityCode);
        console.log(result);
      } catch (error) {
        console.error('Error recieved', error.message);
      }
    }
    getLocation();
    fetchMyLocation();
  });
  return myCityCode;
}