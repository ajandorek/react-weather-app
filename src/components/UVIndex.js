import React from 'react';
import { uvIndexMessage } from '../utils/weather';

const UVIndex = props => {
  const { uvData, uvResponse } = props;
  if (uvResponse === false) return <i className="loader wi wi-owm-01d" />;
  return (
    <div className="uvindex">
      <h1 className="uvindex__title">{uvData.value}</h1>
      <p>{uvIndexMessage(uvData.value)}</p>
    </div>
  );
};

export default UVIndex;
