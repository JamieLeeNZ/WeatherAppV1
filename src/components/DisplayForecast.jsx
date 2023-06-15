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
    <div className="mt-10 p-4 w-64 rounded-mdr text-center font-serif font-family-Times border border-gray-100 rounded-2xl">
      <h2 className="mb-2 text-lg font-semibold italic">
        3 day forecast
      </h2>
      <div className="grid grid-cols-3 gap-x-3 items-stretch  justify-center text-xs">
        {forecast.forecastday.map((day) => (
          <div key={day.date}>
            <p>
              {displayDate(day.date)}
            </p>
            <img 
              src={day.day.condition.icon} 
              alt="Weather Icon" 
              className="w-8 h-8 mx-auto my-2 block"
            />
            <p>
              {Math.round(day.day.avgtemp_c)}°C
            </p>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default DisplayForecast;