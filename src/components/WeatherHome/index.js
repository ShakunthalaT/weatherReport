import { Component } from "react";

import "./index.css";

class WeatherHome extends Component {
  state = {
    weatherData: [],
    searchInput: "",
  };

  getData = async (event) => {
    if (event.key === "Enter") {
      const { searchInput } = this.state;

      const url = `https://api.weatherstack.com/current?access_key=b4d3ff61b86973892de911d8e4d7f343&query=${searchInput}`;

      const options = {
        method: "GET",
      };

      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);

      this.setState({ weatherData: data });
    }
  };

  toDateFunction = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const date = `${weekDays[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  toGetTime = () => {
    const dateTime = new Date();
    const showTime =
      dateTime.getHours() +
      ":" +
      dateTime.getMinutes() +
      ":" +
      dateTime.getSeconds();
    return showTime;
  };

  renderLocation = () => {
    const { weatherData } = this.state;

    return (
      <>
        <div className="city-name">
          {weatherData.current ? (
            <img
              src={weatherData.current.weather_icons}
              className="image"
              alt="cloud"
            />
          ) : null}

          {weatherData.location ? (
            <p className="location">{weatherData.location.name}</p>
          ) : null}
        </div>
        {weatherData.current ? (
          <p className="temp">
            temperature : {weatherData.current.temperature}F
          </p>
        ) : null}
        {weatherData.current ? (
          <p className="speed">wind speed : {weatherData.current.wind_speed}</p>
        ) : null}
      </>
    );
  };

  changeInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  render() {
    const { searchInput } = this.state;

    return (
      <div className="main-container">
        <img
          src="https://res.cloudinary.com/drz669sta/image/upload/v1724906293/images_khdpaw.png"
          className="cloud-image"
          alt="cloud"
        />
        <h1 className="main-heading">Weather Report</h1>
        <div className="form">
          <input
            type="text"
            value={searchInput}
            onChange={this.changeInput}
            placeholder="Enter city name"
            className="input"
            onKeyPress={this.getData}
            onClick={this.onChangeColor}
          />
          <button type="submit" className="button">
            <img
              src="https://assets.ccbp.in/frontend/react-js/google-search-icon.png"
              alt="search"
              className="search"
            />
          </button>
        </div>
        <div>{this.renderLocation()}</div>
        <div className="date">{this.toDateFunction()}</div>
        <div className="time">{this.toGetTime()}</div>
      </div>
    );
  }
}

export default WeatherHome;
