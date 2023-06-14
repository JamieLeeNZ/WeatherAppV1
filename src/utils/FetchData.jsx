import React, { useEffect } from 'react';

const FetchData = ({
  location,
  setWeatherData,
  setTimeData,
  setError,
  setIsLoading,
  setIsDataFetched,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const weatherResponse = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/current.json?key=${import.meta.env.VITE_APP_API_KEY}&q=${location}`
        );

        if (!weatherResponse.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const weatherData = await weatherResponse.json();
        setWeatherData(weatherData);

        const timeResponse = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/timezone.json?key=${import.meta.env.VITE_APP_API_KEY}&q=${location}`
        );

        if (!timeResponse.ok) {
          throw new Error('Failed to fetch time data');
        }

        const timeData = await timeResponse.json();
        setTimeData(timeData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
        setIsDataFetched(false);
      }
    };

    fetchData();
  }, [location, setWeatherData, setTimeData, setError, setIsLoading, setIsDataFetched]);

  return null;
};

export default FetchData;