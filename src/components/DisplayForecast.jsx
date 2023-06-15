import React, { useState, useEffect } from 'react';

function DisplayForecast({ forecastData }) {
  if (!forecastData) {
    return null;
  }

  const { location, forecast } = forecastData;

  function displayDate(date) {
    if (date === forecast.forecastday[0].date) {
      return `Today`;
    } else if (date === forecast.forecastday[1].date) {
      return `Tomorrow`;
    } else {
      const dateObj = new Date(date);
      const day = dateObj.getDate();
      const month = dateObj.getMonth() + 1;
      const year = dateObj.getFullYear();
      return `${day}/${month}/${year}`;
    }
  }

  return (
    <div className="mt-5 p-4 w-65 rounded-mdr text-center font-serif font-family-Times=">
      <h2 className="mb-5 text-lg font-semibold italic">
        7-day forecast
      </h2>
      <div className="grid text-xs">
        {forecast.forecastday.map((day) => (
          <div key={day.date}>
            <p className="grid grid-cols-3 items-center px2">
              <p>{displayDate(day.date)}</p>
              <img
                src={day.day.condition.icon}
                alt="Weather Icon"
                className="w-8 h-8 mx-8 block"
              />
              <p className="pr-7">L: {Math.round(day.day.mintemp_c)}°C • H: {Math.round(day.day.maxtemp_c)}°C</p>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayForecast;