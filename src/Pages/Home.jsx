import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';
import WeatherForecast from '../components/WeatherForecast';
import { MdOutlineMyLocation } from "react-icons/md";
import morning from "../assets/images/day-bg-image.jpg"
import night from "../assets/images/night-bg-image.jpg"
import '../App.css';

const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const Home = ({ darkMode }) => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    loadWeather();
  }, []);

  const loadWeather = () => {
    const savedLocation = getSavedLocation();
    if (savedLocation) {
      getWeatherByCoordinates(savedLocation.lat, savedLocation.lon);
    } else {
      fetchWeatherData('Delhi');
    }
  };

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(
        `${BASE_URL}weather?q=${city}&appid=d4094c06e0195d75ef238b152b266823&units=metric`
      );
      setWeather(response.data);
      getDailyForecast(response.data.coord);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const getDailyForecast = async (coords) => {
    try {
      const response = await axios.get(
        `${BASE_URL}onecall?lat=${coords.lat}&lon=${coords.lon}&appid=50c2acd53349fabd54f52b93c8650d37&units=metric`
      );
      setForecast(response.data.daily);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchWeatherData(city);
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        saveLocation({ lat: latitude, lon: longitude });
        getWeatherByCoordinates(latitude, longitude);
      });
    }
  };

  const getWeatherByCoordinates = async (lat, lon) => {
    try {
      const response = await axios.get(
        `${BASE_URL}weather?lat=${lat}&lon=${lon}&appid=d4094c06e0195d75ef238b152b266823&units=metric`
      );
      setWeather(response.data);
      getDailyForecast({ lat, lon });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const saveLocation = (location) => {
    localStorage.setItem('savedLocation', JSON.stringify(location));
  };

  const getSavedLocation = () => {
    const savedLocation = localStorage.getItem('savedLocation');
    if (savedLocation) {
      return JSON.parse(savedLocation);
    }
    return null;
  };

  const formatDate = (timestamp, timezone = null) => {
    const localtime = new Date(timestamp);
    const offset = localtime.getTimezoneOffset() * 60 * 1000; // in milliseconds
    const date = new Date(localtime.getTime() + offset + (timezone || 0) * 1000); // timezone is in seconds
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[date.getUTCDay()];
    const dayNumber = date.getUTCDate();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; 
    
    if (hours < 10) {
      hours = `0${hours}`;
    }

    if ((hours >= 7 && ampm === "PM") || (hours < 6 && ampm === "AM") || (hours === 12 && ampm === "AM")) {
      document.body.classList.add("nightmode");
    } else {
      document.body.classList.remove("nightmode");
    }

    return `${day}, ${dayNumber} ${month} ${year} | ${hours}:${minutes} ${ampm}`;
  };

  const containerStyle = {
    backgroundImage: darkMode ? {night} : {morning},
    color: darkMode ? '#fff' : '#000',
  };

  return (
    <div className="container" >
      <div className="weather-app">
        <div className="row header">
          <div className="col-6">
            <h1 id="city-name">{weather?.name || 'City Name'}</h1>
            <h2 id="date-hour">{weather ? formatDate(weather.dt * 1000, weather.timezone) : 'Date and Time'}</h2>
          </div>
          <div className="col-5">
            <form id="search-form" onSubmit={handleSearch}>
              <input
                type="search"
                className="form-control"
                placeholder="Type a city or location"
                id="city-input"
                name="cityInput"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                autoComplete="off"
                style={{outline: 'none', paddingLeft: "10px", backgroundColor:darkMode?"black":"white"}}
              />
              <input
                type="submit"
                className="btn btn-outline-primary search-button"
                value="Search"
                id="search-button"
              />
            </form>
            <div className="col-1">
              <button id="location-button" onClick={handleLocation}>
                <MdOutlineMyLocation />
              </button>
            </div>
          </div>
        </div>
        {weather && <WeatherCard weather={weather} darkMode={darkMode} />}
        {forecast && <WeatherForecast forecast={forecast} darkMode={darkMode} />}
      </div>
    </div>
  );
};

export default Home;
