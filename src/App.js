import './App.css';
import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const freeAPIKey = "6956d211cabd1b73d44bdacfe7ce5344";

  const queryWeather = async (e) => {
    e.preventDefault(); // prevent page refresh if inside a form
    if (!city) return;

    try {
      setError(null);
      setWeather(null);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${freeAPIKey}&units=metric`
      );

      if (!response.ok) throw new Error("City not found");

      const data = await response.json(); // <-- only call json() once
      setWeather(data); // <-- set the actual JSON object
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <form className='UserInput' onSubmit={queryWeather}>
        <input
          type="text"
          placeholder='Input City Name'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search Weather</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div className="WeatherData">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <h1><strong>{weather.main.temp}°C</strong></h1>
          <h3><strong>Feels like: {weather.main.feels_like}°C</strong></h3>
          <img class="image" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
          {/*JSON.stringify(weather, null, 2)*/}

          <p><strong>Min / Max: {weather.main.temp_min}°C / {weather.main.temp_max}°C</strong></p>
          
          <p>
            <strong>Humidity:</strong> {weather.main.humidity}%
          </p>
          <p>
            <strong>Pressure:</strong> {weather.main.pressure} hPa
          </p>
          <p>
            <strong>Wind:</strong> {weather.wind.speed} m/s at {weather.wind.deg}°
          </p>
        </div>
      )}
    </div>
  );
}

export default App;