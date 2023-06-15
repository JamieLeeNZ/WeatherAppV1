import React, { useState, useEffect } from 'react';

function DisplayDetails({ forecastData, showMoreData, setShowMoreData }) {
  const [visibleDataIndex, setVisibleDataIndex] = useState(0);

  const handleButtonClick = () => {
    if (!showMoreData) {
      setVisibleDataIndex(0);
    }
    setShowMoreData(!showMoreData);
  };

  useEffect(() => {
    if (showMoreData) {
      const interval = setInterval(() => {
        setVisibleDataIndex((prevIndex) => prevIndex + 1);
      }, 200);

      return () => {
        clearInterval(interval);
      };
    }
  }, [showMoreData]);

  if (!forecastData) {
    return null;
  }

  const { forecast } = forecastData;
  const { hour, day, astro } = forecast.forecastday[0];

  const additionalData = [
    { name: 'Chance of rain:', value: `${day.daily_chance_of_rain}%` },
    { name: 'Total precipitation:', value: `${day.totalprecip_mm} mm` },
    { name: 'Max wind speed:', value: `${day.maxwind_kph} kph` },
    { name: 'Average humidity:', value: `${day.avghumidity}%` },
    { name: 'UV Index:', value: `${day.uv}` },
    { name: 'Sunrise:', value: `${astro.sunrise}` },
    { name: 'Sunset:', value: `${astro.sunset}` },
    { name: 'Moon phase:', value: `${astro.moon_phase}` },
  ];

  const renderedData = additionalData.map((data, index) => (
    <div
      key={index}
      className="grid grid-cols-2 items-center mb-2"
      style={{
        transition: 'opacity 0.5s',
        opacity: visibleDataIndex >= index ? 1 : 0,
        transitionDelay: showMoreData ? `${index * 0.05}s` : '0s',
      }}
    >
      <p className="font-bold mr-2 text-left">{data.name}</p>
      <p className="text-right">{data.value}</p>
    </div>
  ));

  return (
    <div className="p-4 w-70 rounded-mdr text-left font-serif font-family-Times">
      {!showMoreData && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-5"
          onClick={handleButtonClick}
        >
          More data
        </button>
      )}

      {showMoreData && <div className="additional-data text-sm">
        <h2 className="mb-10 text-lg font-semibold italic text-center">
          ~
        </h2>
        {renderedData}</div>}
    </div>
  );
}

export default DisplayDetails;
