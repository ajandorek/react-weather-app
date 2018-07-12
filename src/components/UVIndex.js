import React from 'react';
import { uvIndexMessage } from '../frontend/weather';

const UVIndex = props => {
  const { uvData, uvResponse } = props;
  if (uvResponse === false) return <i className="loader wi wi-owm-01d" />;
  return (
    <div className="uvindex">
      <h1 className="uvindex__title">{uvData}</h1>
      <p>{uvIndexMessage(uvData)}</p>
    </div>
  );
};

export default UVIndex;
