import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  const freeAPIKey = "6956d211cabd1b73d44bdacfe7ce5344";

  const fetchWeather = async (cityName) => {
    if (!cityName) return;

    try {
      setError(null);
      setWeather(null);
      setForecast(null);

      const [currentRes, forecastRes] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${freeAPIKey}&units=metric`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${freeAPIKey}&units=metric`)
      ]);

      if (!currentRes.ok) throw new Error("City not found");

      // Save Data when received
      const currentData = await currentRes.json();
      setWeather(currentData);

      const forecastData = await forecastRes.json();
      setForecast(forecastData);

      // Save location
      localStorage.setItem("location", cityName);

    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  // Trigger to query weather data
  const queryWeather = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  // Fetch up to date data on refresh
  useEffect(() => {
    const savedLocation = localStorage.getItem("location");

    if (savedLocation) {
      setCity(savedLocation);
      fetchWeather(savedLocation);
    }
  }, []);

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
            <img className="image" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
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

      {forecast && (
        <div className="WeatherData">
          <h3>Upcoming Forecast</h3>

          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            {forecast.list.slice(0, 6).map((item, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <p>{item.dt_txt.split(" ")[1].slice(0,5)}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt={item.weather[0].description}
                />
                <p>{item.main.temp}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;