import React, { useState, useEffect } from 'react';

function DisplayWeather({ weatherData, timeData }) {
  const [apiTime, setApiTime] = useState(null);
  const [localTime, setLocalTime] = useState(new Date());

  useEffect(() => {
    if (!timeData) {
      return;
    }

    const apiDateTime = new Date(timeData.location.localtime);
    setApiTime(apiDateTime);
  }, [timeData]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLocalTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const getFormattedTime = (date) => {
    const hours = apiTime ? apiTime.getHours() : timeData.location.localtime.split(' ')[1].slice(0, 5);
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };

  if (!weatherData || !timeData) {
    return null;
  }


  return (
    <div className="mt-5 p-4 w-64 rounded-mdr text-center font-serif font-family-Times border border-gray-100 rounded-2xl">
      <h2 className="mb-2 text-2xl font-semibold italic">
        {weatherData.location.name}
      </h2>
      <p className="mb-2">
        Local time: {getFormattedTime(localTime)}
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