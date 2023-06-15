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
  const { day, astro } = forecast.forecastday[0];

  const additionalData = [
    `Total precipitation: ${day.totalprecip_mm} mm`,
    `Average humidity: ${day.avghumidity}%`,
    `UV Index: ${day.uv}`,
    `Sunrise: ${astro.sunrise}`,
    `Sunset: ${astro.sunset}`,
  ];

  const renderedData = additionalData.map((data, index) => (
    <p
      key={index}
      style={{
        transition: 'opacity 0.5s',
        opacity: visibleDataIndex >= index ? 1 : 0,
        transitionDelay: showMoreData ? `${index * 0.05}s` : '0s',
      }}
    >
      {data}
    </p>
  ));

  return (
    <div className="mt-5 p-4 w-70 rounded-mdr text-left font-serif font-family-Times">
      {!showMoreData && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-5"
          onClick={handleButtonClick}
        >
          More data
        </button>
      )}

      {showMoreData && <div className="additional-data">{renderedData}</div>}
    </div>
  );
}

export default DisplayDetails;
