import React from 'react';
import ToggleSwitch from '@trendmicro/react-toggle-switch';

const UnitToggle = ({ unitChange, checkUnit }) => (
  <div>
    F
    <ToggleSwitch size="sm" checked={checkUnit} onChange={unitChange} />
    C
  </div>
);

export default UnitToggle;
