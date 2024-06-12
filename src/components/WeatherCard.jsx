import React from "react";
import image1 from "../assets/icons/01d.svg";
import image2 from "../assets/icons/01n.svg";
import image3 from "../assets/icons/02d.svg";
import image4 from "../assets/icons/02n.svg";
import image5 from "../assets/icons/03d.svg";
import image6 from "../assets/icons/03n.svg";
import image7 from "../assets/icons/04d.svg";
import image8 from "../assets/icons/04n.svg";
import image9 from "../assets/icons/09d.svg";
import image10 from "../assets/icons/09n.svg";
import image11 from "../assets/icons/10d.svg";
import image12 from "../assets/icons/10n.svg";
import image13 from "../assets/icons/11d.svg";
import image14 from "../assets/icons/11n.svg";
import image15 from "../assets/icons/13d.svg";
import image16 from "../assets/icons/13n.svg";
import image17 from "../assets/icons/50d.svg";
import image18 from "../assets/icons/50n.svg";
import { WiHumidity, WiStrongWind, WiThermometer } from "react-icons/wi";
import { TbTemperatureCelsius } from "react-icons/tb";

function WeatherCard({ weather, darkMode }) {
  const iconMap = {
    "01d": image1,
    "01n": image2,
    "02d": image3,
    "02n": image4,
    "03d": image5,
    "03n": image6,
    "04d": image7,
    "04n": image8,
    "09d": image9,
    "09n": image10,
    "10d": image11,
    "10n": image12,
    "11d": image13,
    "11n": image14,
    "13d": image15,
    "13n": image16,
    "50d": image17,
    "50n": image18,
  };

  const iconSrc = iconMap[weather.weather[0].icon] || image1;

  const cardStyle = {
    display: "flex",
    justifyContent: "space-between",
    color: darkMode ? "white" : "black",
  };

  const textStyle = {
    color: darkMode ? "white" : "black",
  };

  return (
    <div className="row body" style={cardStyle}>
      <div className="col-7 current-weather">
        <h3 id="temperature" style={textStyle}>
          {Math.round(weather.main.temp)}
        </h3>
        <div className="relative text-3xl">
          <TbTemperatureCelsius className="absolute top-[-35px] left-[-25px]"style={textStyle}/>
        </div>
        <ul>
          <li id="weather-description" style={textStyle}>
            {weather.weather[0].description}
          </li>
        </ul>
      </div>
      <div className="col-3">
        <img id="weather-icon" src={iconSrc} alt="weather-icon" />
        <div>
          <ul id="weather-info">
            <li id="info-container" style={textStyle}>
              <WiThermometer size={30} style={textStyle} />
              Feels like: <span id="feels-like">{Math.round(weather.main.feels_like)}°C</span>
            </li>
            <li id="info-container" style={textStyle}>
              <WiHumidity className="icon" size={30} style={textStyle} />
              Humidity: <span id="humidity-level">{weather.main.humidity}%</span>
            </li>
            <li id="info-container" style={textStyle}>
              <WiStrongWind className="icon" size={30} style={textStyle} />
              Wind: <span id="wind-speed">{Math.round(weather.wind.speed)} km/h</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
