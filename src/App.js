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
      <form onSubmit={queryWeather}>
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
        <pre
          style={{
            textAlign: "left",
            background: "#001f3f",
            padding: "10px",
            color: "white",
            overflowX: "auto"
          }}
        >
          {JSON.stringify(weather, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;