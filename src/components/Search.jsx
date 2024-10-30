import React, { useState, useEffect } from "react";
import { getWeatherData } from "../api/weatherApi";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Search() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem("favorites")) || []
    );

    const handleCityChange = (e) => setCity(e.target.value);

    const handleSearch = async () => {
        try {
            // Per ora, inserisci delle coordinate fisse oppure usa una logica per ottenerle
            const data = await getWeatherData(35, 139);
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

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
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
                style={{ marginLeft: '10px' }}
                onClick={handleSearch}
            >
                Go
            </button>
            <button
                type="button"
                className="btn btn-info"
                style={{ marginLeft: '10px' }}
                onClick={saveFavorite}
                disabled={!city}
            >
                Save Favorite
            </button>

            {weather && (
                <div>
                    <h3>Weather in {city}</h3>
                    <p>Temperature: {weather.hourly.temperature_2m[0]}°C</p>
                </div>
            )}

            <div>
                <h4>Favorites</h4>
                <ul>
                    {favorites.map((fav, index) => (
                        <li key={index}>{fav}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Search;
