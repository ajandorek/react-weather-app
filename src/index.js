import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import '../style/_main.scss';

render(<App />, document.getElementById('root'));
