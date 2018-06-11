import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends Component {
  render() {
    /* eslint-disable jsx-a11y/anchor-is-valid */
    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="/forecast">Forecast</Link>
        <Link to="/uvindex">UV Index</Link>
      </div>
    );
  }
}
