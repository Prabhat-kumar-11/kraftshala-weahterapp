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

function WeatherForecast({ forecast, darkMode }) {
  const formatDays = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = date.getDay();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[day];
  };

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

  return (
    <div className="row weather-forecast" id="forecast" style={{backgroundColor:darkMode?"#3539ad52":" rgba(242, 157, 105, 0.6)"}}>
      {forecast.slice(0, 5).map((forecastDay, index) => {
        const iconSrc = iconMap[forecastDay.weather[0].icon];

        return (
          <div key={index} className="col weekdays">
            <h4>{formatDays(forecastDay.dt)}</h4>
            {iconSrc ? (
              <img
                src={iconSrc}
                alt={forecastDay.weather[0].description}
                className="weekday-weather"
              />
            ) : (
              <p>No Icon</p>
            )}
            <p className="forecast-temp">
              <span className="forecast-temp-max">
                {Math.round(forecastDay.temp.max)}°
              </span>{" "}
              -
              <span className="forecast-temp-min">
                {Math.round(forecastDay.temp.min)}°
              </span>
            </p>
            <p className="weather-type">{forecastDay.weather[0].description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default WeatherForecast;
