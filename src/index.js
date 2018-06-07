import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import '@trendmicro/react-toggle-switch/dist/react-toggle-switch.css';

import App from './components/App';
import '../node_modules/weather-icons-lite/css/weather-icons-lite.min.css';
import '../style/_main.scss';

render(<App />, document.getElementById('root'));
