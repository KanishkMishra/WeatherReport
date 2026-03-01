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

    // Group all data points by date
    const groupedByDate = forecast.list.reduce((acc, item) => {
        const date = item.dt_txt.split(" ")[0]; // "YYYY-MM-DD"

        if (!acc[date]) {
            acc[date] = [];
        }

        acc[date].push(item);
        return acc;
    }, {});

    // Group data into 5 days
    const fiveDayData = Object.entries(groupedByDate)
        .slice(0, 5)
        .map(([date, items]) => {

        const temps = items.map(item => item.main.temp);

        return {
            date,
            min: Math.min(...temps),
            max: Math.max(...temps)
        };
    });


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

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="fiveDay">
            {forecast && (
                <div className="WeatherData">
                    {fiveDayData.map((day, index) => (
                        <div key={index} style={{ margin: "20px 0" }}>
                            <h3>{day.date}</h3>
                            <p>
                                {day.min.toFixed(1)}°C / {day.max.toFixed(1)}°C
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
}

export default WeekPage;