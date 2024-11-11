import axios from 'axios';

export const getWeatherData = async (latitude, longitude) => {
    try {
        const response = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m&daily=weather_code,wind_speed_10m_max&forecast_days=1&current_weather=true`
        );
        return response.data;
        
    } catch (error) {
        console.error("Errore nel caricamento dei dati meteo", error);
        throw error;
    }
};
export const getCityCoordinates = async (cityName) => {
    try {
        const response = await axios.get(
            `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=10&language=it&format=json`
        );
        if (response.data && response.data.results && response.data.results.length > 0) {
            const { latitude, longitude } = response.data.results[0];
            return { latitude, longitude };
        } else {
            throw new Error("City not found");
        }
    } catch (error) {
        console.error("Errore download city", error);
        throw error;
    }
};
