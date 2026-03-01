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
        .map(([date, items], idx) => {
            // Get min/max for the day
            const temps = items.map(item => item.main.temp);
            const minTemp = idx === 0 ? weather.main.temp_min : Math.min(...temps);
            const maxTemp = idx === 0 ? weather.main.temp_max : Math.max(...temps);

            // Count the frequency of each icon
            const iconCounts = items.reduce((acc, item) => {
                const icon = item.weather[0].icon;
                acc[icon] = (acc[icon] || 0) + 1;
                return acc;
            }, {});

            // Get the most common icon
            const mostCommonIcon = Object.entries(iconCounts).reduce((a, b) =>
                b[1] > a[1] ? b : a
            )[0];

            return {
                date,
                min: minTemp,
                max: maxTemp,
                icon: mostCommonIcon
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

        {forecast && weather && (
            <div className="fiveDay">
                {fiveDayData.map((day, index) => (
                        <div key={index}>
                            <h3>{day.date}</h3>
                            <img    className="image"
                                    src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                                    alt="weather icon"
                            />
                            <p>{day.min.toFixed(1)}°C / {day.max.toFixed(1)}°C</p>
                        </div>
                    )
                )}
            </div>
        )}
    </div>
  );
}

export default WeekPage;