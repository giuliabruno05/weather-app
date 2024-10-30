import axios from 'axios';

export const getWeatherData = async (latitude, longitude) => {
    try {
        const response = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`
        );
        return response.data;
    } catch (error) {
        console.error("Errore nel caricamento dei dati meteo", error);
        throw error; // Propaga l'errore per la gestione nel componente
    }
};
