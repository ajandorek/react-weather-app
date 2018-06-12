import React from 'react';

const UnitToggle = props => {
  const { unitChange } = props;
  return (
    <div className="unitChange">
      <button className="unitChange__button" onClick={() => unitChange('FAHRENHEIT')}>
        F°
      </button>
      <button className="unitChange__button" onClick={() => unitChange('CELCIUS')}>
        C°
      </button>
    </div>
  );
};

export default UnitToggle;
