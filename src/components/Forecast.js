import React from 'react';
import ForecastDay from './ForecastDay';

const Forecast = props => {
  const { apiResponse, forecastData, isCelcius } = props;
  if (apiResponse === false) return <div>Loading</div>;
  return (
    <div className="forecast">
      {forecastData.list.map((day, i) => (
        <ForecastDay key={i} weather={day} isCelcius={isCelcius} />
      ))}
    </div>
  );
};

export default Forecast;
