import './App.css';
import { useState, useEffect } from "react";

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Today from './pages/Today';
import Week from './pages/Week';

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

  // Fetch up to date data on refresh
  useEffect(() => {
    const savedLocation = localStorage.getItem("location");

    if (savedLocation) {
      setCity(savedLocation);
      fetchWeather(savedLocation);
    }
  }, []);

   return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Today
              city={city}
              setCity={setCity}
              weather={weather}
              forecast={forecast}
              error={error}
              fetchWeather={fetchWeather}
            />
          }
        />
        <Route
          path="/week"
          element={
            <Week  
              city={city}
              setCity={setCity}
              weather={weather}
              forecast={forecast}
              error={error}
              fetchWeather={fetchWeather}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;