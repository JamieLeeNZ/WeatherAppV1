import React, { useState } from 'react';


function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [timeData, setTimeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const weatherResponse = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/current.json?key=${import.meta.env.VITE_APP_API_KEY}&q=${location}`
      );

      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const weatherData = await weatherResponse.json();
      setWeatherData(weatherData);
    } catch (error) {
      setError(error.message);
    } 
  };

  const fetchTimeData = async () => {
    try {
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
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await Promise.all([fetchWeatherData(), fetchTimeData()]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={handleInputChange}
        />
        <button type="submit">Get Weather</button>
      </form>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {weatherData && timeData && (
        <div>
          <h2>Weather Information</h2>
          <p>Location: {weatherData.location.name}</p>
          <p>Local time: {timeData.location.localtime}</p>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <img src={weatherData.current.condition.icon} alt="Weather Icon" />
          <p>Condition: {weatherData.current.condition.text}</p>
        </div>
      )}
    </div>
  );
}

export default App;