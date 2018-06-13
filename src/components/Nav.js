import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <NavLink to="/" exact className="nav__link" activeClassName="nav__active">
          Home
        </NavLink>
        <NavLink to="/forecast" className="nav__link" activeClassName="nav__active">
          Forecast
        </NavLink>
        <NavLink to="/uvindex" className="nav__link" activeClassName="nav__active">
          UV Index
        </NavLink>
      </div>
    );
  }
}
