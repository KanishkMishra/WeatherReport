import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";


function TodayPage({
  city,
  setCity,
  weather,
  forecast,
  error,
  fetchWeather,
  suggestions
}) {

        // Calculate Time local to searched city
  const timeCalc = (currentTime, timeZoneShift) => {
      const localTime = new Date((currentTime + timeZoneShift) * 1000);
      return localTime.getUTCHours().toString().padStart(2, "0") + ":" + localTime.getUTCMinutes().toString().padStart(2, "0");
  }

  return (
    <div className="App">
      
      <SearchBar 
        city={city}
        setCity={setCity}
        fetchWeather={fetchWeather}
        title='Current & Hourly Weather'
        suggestions={suggestions}
      />


      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather &&      
      <Link to="/week">
        <button>View Five-Day Forecast</button>
      </Link>}

      {weather && (() => {
        // format time to be local to searched city
        const formatedTime = timeCalc(weather.dt, weather.timezone);

        return (<div className="WeatherData">
            <h2>{city}</h2>
            <h1><strong>{weather.main.temp}°C</strong></h1>
            <h3>Feels like: <strong>{weather.main.feels_like}°C</strong></h3>
            <h3>Current Time: <strong>{formatedTime}</strong></h3>
            
            <img    className="image" 
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                    alt={weather.weather[0].description} 
            />

            <p><strong>Min / Max: {weather.main.temp_min}°C / {weather.main.temp_max}°C</strong></p>
            <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
            <p><strong>Pressure:</strong> {weather.main.pressure} hPa</p>
            <p><strong>Wind:</strong> {weather.wind.speed} m/s at {weather.wind.deg}°</p>
        </div>
        );
      })()}

      {forecast && (
        <div className="WeatherData">
          <h3>Upcoming Forecast</h3>

          <div className="hourInterval">
            {
              forecast.list.slice(0, 6).map((item, index) => {
              
                // Make sure time is local to the city being searched for
                const formatedTime = timeCalc(item.dt, forecast.city.timezone);

                return (
                    <div key={index}>
                    <p>{formatedTime}</p>
                    
                    <img className="image"
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                        alt={item.weather[0].description}
                    />
                    
                    <p>{item.main.temp}°C</p>
                    </div>
                );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default TodayPage;