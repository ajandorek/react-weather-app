import React from 'react';
import { TEMP_CONSTS } from '../utils/weather';

const UnitToggle = props => {
  const { changeUnit } = props;
  return (
    <div className="unitChange">
      <button className="unitChange__button" onClick={() => changeUnit(TEMP_CONSTS.FAHRENHEIT)}>
        F°
      </button>
      <button className="unitChange__button" onClick={() => changeUnit(TEMP_CONSTS.CELCIUS)}>
        C°
      </button>
    </div>
  );
};

export default UnitToggle;
