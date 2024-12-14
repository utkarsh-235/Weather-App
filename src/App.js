import './App.css';
import { Search, MapPin, Wind } from 'react-feather';
import getWeather from './api/api';
import dateformat from 'dateformat';
import { useState, useEffect} from 'react';

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  const getWeatherbyCity = async () => {
    const weatherData = await getWeather(city);
    setWeather(weatherData);
    setCity("");
  };

  const renderDate = () => {
    let now = new Date();
    return dateformat(now, "dddd, mmmm dS, hh:MM TT");
  };

  const getBackgroundClass = () => {
    if (weather && weather.weather) {
      const description = weather.weather[0].description.toLowerCase();
      if (description.includes("clear sky")) return "sky";
      if (description.includes("haze")) return "haze";
      if (description.includes("rain")) return "rainy";
      if (description.includes("cloud")) return "cloudy";
      if (description.includes("snow")) return "snowy";
      if (description.includes("thunderstorm")) return "thunderstorm";
      if (description.includes("mist")) return "misty";
      return "default";
    }
    return "default";
  };

  useEffect(() => {
    const backgroundClass = getBackgroundClass();
    document.body.className = backgroundClass; // Apply the class to <body>
  }, [weather]);

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className="input-wrapper">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City Name"
        />
        <button onClick={() => getWeatherbyCity()}>
          <Search></Search>
        </button>
      </div>
      {weather && weather.weather && (
        <div className="content">
          <div className="location d-flex">
            <MapPin></MapPin>
            <h2>
              {weather.name}
              <span> ({weather.sys.country}) </span>
            </h2>
          </div>
          <p className="datetext">{renderDate()}</p>
          <div className="weatherdesc d-flex flex-c">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
            />
            <h3>{weather.weather[0].description}</h3>
          </div>
          <div className="tempstats d-flex flex-c">
            <h1>
              {weather.main.temp}
              <span>&deg;C</span>
            </h1>
            <h3>
              Feels Like {weather.main.feels_like}
              <span>&deg;C</span>
            </h3>
          </div>
          <div className="windstats d-flex">
            <Wind></Wind>
            <h3>
              Wind is {weather.wind.speed} Knots in {weather.wind.deg}&deg;
            </h3>
          </div>
        </div>
      )}
      {!weather.weather && (
        <div className="content">
          <h4>No Data Found !</h4>
        </div>
      )}
      <p>{/*JSON.stringify(weather)*/}</p>
    </div>
  );
}

export default App;
