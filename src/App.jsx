import React, { useState } from 'react';

import FetchData from './utils/FetchData';
import GetInput from './utils/GetInput';
import DisplayWeather from './components/DisplayWeather';
import DisplayForecast from './components/DisplayForecast';
import DisplayDetails from './components/DisplayDetails';


function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [timeData, setTimeData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [showMoreData, setShowMoreData] = useState(false);

  const handleInputChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsDataFetched(true);
    setShowMoreData(false);
  };


  return (
    <div className="overflow-y-auto h-screen">
      <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-5xl mb-5 font-serif font-family-Georgia">Weather App</h1>
      <GetInput
        location={location}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      {isDataFetched && (
        <FetchData
          location={location}
          setWeatherData={setWeatherData}
          setTimeData={setTimeData}
          setForecastData={setForecastData}
          setError={setError}
          setIsLoading={setIsLoading}
          setIsDataFetched={setIsDataFetched}
        />
      )}
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <DisplayWeather weatherData={weatherData} timeData={timeData} />
      <DisplayForecast forecastData={forecastData} />
      <DisplayDetails forecastData={forecastData} showMoreData={showMoreData} setShowMoreData={setShowMoreData} />
    </div>
    </div>
    
  );
}

export default App;