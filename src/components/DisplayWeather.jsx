import React, { useState, useEffect } from 'react';
import moment from 'moment';

function DisplayWeather({ weatherData, timeData }) {
  const [apiTime, setApiTime] = useState(null);
  const [localTime, setLocalTime] = useState(new Date());

  useEffect(() => {
    if (!timeData || !timeData.location || !timeData.location.localtime) {
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
    let hours;

    if (apiTime && !isNaN(apiTime)) {
      hours = moment(apiTime).format('HH');
    } else if (timeData && timeData.location && timeData.location.localtime) {
      const localTime = moment(timeData.location.localtime, 'YYYY-MM-DD HH:mm').toDate();
      hours = moment(localTime).format('HH');
    } else {
      hours = moment(date).format('HH');
    }

    const minutes = moment(date).format('mm');
    const seconds = moment(date).format('ss');

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