import React from 'react';

function DisplayWeather({ weatherData, timeData }) {
  if (!weatherData || !timeData) {
    return null;
  }

  return (
    <div className="mt-5 p-4 rounded-mdr text-center font-serif font-family-Times border border-gray-100 rounded-2xl">
      <h2 className="mb-2 text-2xl font-semibold italic">
        {weatherData.location.name}
      </h2>
      <p className="mb-2">
        Local time: {timeData.location.localtime}
      </p>
      <img
          src={weatherData.current.condition.icon}
          alt="Weather Icon"
          className="w-200 h-200 mx-auto block"
        />
        <p>
          {weatherData.current.condition.text} • {weatherData.current.temp_c}°C
        </p>
    </div>
  );
}

export default DisplayWeather;