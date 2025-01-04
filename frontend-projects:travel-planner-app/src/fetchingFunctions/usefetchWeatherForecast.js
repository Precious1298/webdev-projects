import { useEffect } from 'react';

const apiKey = 'c4d3be2ad65f981855965239aa5b3a12';

export default function fetchWeatherForecast(city, dispatch) {
  const URLWEATHER = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(URLWEATHER);
        if (response.status !== 200) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        let formattedData = convertWeatherData(responseData);
        dispatch({ type: 'weatherData', payload: formattedData });
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchWeatherData();
  }, [city, dispatch, URLWEATHER]);
}

function convertWeatherData(data) {
  const weatherData = {
    weatherCondition: data.weather[0].main,
    weatherConditionIcon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    temperature: (data.main.temp - 273.15).toFixed(1),
    humidity: data.main.humidity,
  };
  return weatherData;
}