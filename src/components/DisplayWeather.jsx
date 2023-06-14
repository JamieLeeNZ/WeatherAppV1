import React from 'react';

function DisplayWeather({ weatherData, timeData }) {
  if (!weatherData || !timeData) {
    return null;
  }

  return (
    <div>
      <h2>Weather Information</h2>
      <p>Location: {weatherData.location.name}</p>
      <p>Local time: {timeData.location.localtime}</p>
      <p>Temperature: {weatherData.current.temp_c}°C</p>
      <img src={weatherData.current.condition.icon} alt="Weather Icon" />
      <p>Condition: {weatherData.current.condition.text}</p>
    </div>
  );
}

export default DisplayWeather;