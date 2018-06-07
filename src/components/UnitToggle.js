import React from 'react';
import ToggleSwitch from '@trendmicro/react-toggle-switch';

const UnitToggle = props => (
  <div>
    F
    <ToggleSwitch
      size="sm"
      checked={props.checkUnit}
      onChange={() => {
        props.unitChange();
      }}
    />
    C
  </div>
);

export default UnitToggle;
