import React, { Component } from 'react';
import { currentWeather } from '../utils/current_weather';

export default class Weather extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      res: false,
      temp: null,
    };
  }

  componentDidMount() {
    this.getWeather();
  }

  getWeather() {
    currentWeather().then(res =>
      this.setState({
        data: res.data,
        res: true,
        temp: res.data.main.temp,
      }));
  }

  render() {
    if (this.state.res === false) return <div>Loading</div>;
    return (
      <div>
        <h1>Today's weather for {this.state.data.name}</h1>
        <h2>{this.state.temp}</h2>
      </div>
    );
  }
}
