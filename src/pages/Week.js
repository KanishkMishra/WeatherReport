import { Link } from "react-router-dom";

function WeekPage({
    city,
    setCity,
    weather,
    forecast,
    error,
   fetchWeather
}) {
   // Trigger to query weather data
   const queryWeather = (e) => {
      e.preventDefault();
      fetchWeather(city);
   };

  return (
    <div className="App">

    <form className='UserInput' onSubmit={queryWeather}>
        <h3>Five-Day Forecast</h3>
        <input
          type="text"
          placeholder='Input City Name'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search Weather</button>

        <Link to="/">
            <button>Back to Current Weather</button>
        </Link>
      </form>


    </div>
  );
}

export default WeekPage;