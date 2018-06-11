import React from 'react';
import { uvIndexMessage } from '../utils/weather';

const UVIndex = props => {
  const { uvData, uvResponse } = props;
  if (uvResponse === false) return <div>Loading</div>;
  return (
    <div>
      <h1>{uvData.value}</h1>
      <p>{uvIndexMessage(uvData.value)}</p>
    </div>
  );
};

export default UVIndex;
