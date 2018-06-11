import React from 'react';

const UnitToggle = props => {
  const { toCelcius, toFahrenheit } = props;
  return (
    <div>
      <button onClick={toFahrenheit}>F°</button>
      <button onClick={toCelcius}>C°</button>
    </div>
  );
};

export default UnitToggle;
