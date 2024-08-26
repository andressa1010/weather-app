import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "92bcf3681a98aa456d059522ee34de07";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Erro ao buscar a previsão do tempo", error);
    }
  };

  return (
    <div>
      <h1>Previsão do Tempo</h1>
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        placeholder="Digite o nome da cidade"
      />
      <button onClick={handleSearch}>Buscar</button>
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperatura: {weatherData.main.temp}°C</p>
          <p>Umidade: {weatherData.main.humidity}%</p>
          <p>Condições: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
