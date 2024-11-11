import React, { useState, useEffect } from "react";
import { getWeatherData } from "../api/weatherApi";
import { getCityCoordinates } from "../api/weatherApi";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
function Search() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [favoriteWeatherData, setFavoriteWeatherData] = useState({});
  const handleCityChange = (e) => setCity(e.target.value);
  const weatherCodeDescriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Freezing light drizzle",
    57: "Freezing dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Freezing light rain",
    67: "Freezing heavy rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };

  function getWeatherDescription(weatherCode) {
    return weatherCodeDescriptions[weatherCode] || "Unknown weather condition";
  }

  const handleSearch = async () => {
    try {
      const { latitude, longitude } = await getCityCoordinates(city);
      const data = await getWeatherData(latitude, longitude);
      console.log(data);
      setWeather(data);
    } catch (error) {
      console.error("Errore durante la ricerca meteo", error);
    }
  };

  const saveFavorite = () => {
    if (!favorites.includes(city)) {
      const updatedFavorites = [...favorites, city];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };
  const deleteCity = (cityToDelete) => {
    const updatedFavorites = favorites.filter((fav) => fav !== cityToDelete);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // useEffect(() => {
  //   localStorage.setItem("favorites", JSON.stringify(favorites));
  // }, [favorites]);
  useEffect(() => {
    const fetchFavoriteWeatherData = async () => {
      const data = {};
      for (const favCity of favorites) {
        try {
          const { latitude, longitude } = await getCityCoordinates(favCity);
          const weatherData = await getWeatherData(latitude, longitude);
          data[favCity] = weatherData;
        } catch (error) {
          console.error(`Errore nel recuperare i dati per ${favCity}`, error);
        }
      }
      setFavoriteWeatherData(data);
    };

    fetchFavoriteWeatherData();
  }, [favorites]);

  return (
    <div>
      <input
        type="search"
        name="Search"
        className="btn btn-light"
        placeholder="Search"
        value={city}
        onChange={handleCityChange}
      />
      <button
        type="button"
        className="btn btn-dark"
        style={{ marginLeft: "10px" }}
        onClick={handleSearch}
      >
        Go
      </button>
      <button
        type="button"
        className="btn btn-info"
        style={{ marginLeft: "10px" }}
        onClick={saveFavorite}
        disabled={!city}
      >
        <FontAwesomeIcon icon={faHeart} />
      </button>

      {weather && (
        <div>
          <h3>Weather in {city}</h3>
          <p>Temperature: {weather.current_weather.temperature}°C</p>
          <p>humidity: {weather.hourly.relative_humidity_2m[0]}%</p>
          <p>Speed Wind: {weather.current_weather.windspeed} km/h</p>
          <p>
            Weather Conditions:{" "}
            {getWeatherDescription(weather.current_weather.weathercode)}
          </p>
        </div>
      )}

      <div>
        <h4>Favorites</h4>
        <ul>
          {favorites.map((favCity) => (
            <li key={favCity}>
              <h5>{favCity}</h5>
              {favoriteWeatherData[favCity] ? (
                <div className="">
                  <p>
                    Temperature:{" "}
                    {favoriteWeatherData[favCity].current_weather.temperature}°C
                  </p>
                  <p>
                    Humidity:{" "}
                    {
                      favoriteWeatherData[favCity].hourly
                        .relative_humidity_2m[0]
                    }
                    %
                  </p>
                  <p>
                    Wind Speed:{" "}
                    {favoriteWeatherData[favCity].current_weather.windspeed}{" "}
                    km/h
                  </p>
                  <p>
                    Condition:{" "}
                    {getWeatherDescription(
                      favoriteWeatherData[favCity].current_weather.weathercode
                    )}
                  </p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
              <button
                className="circle_icon"
                onClick={() => deleteCity(favCity)}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Search;
