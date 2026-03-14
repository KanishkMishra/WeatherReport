import { Link } from "react-router-dom";
import { MapContainer, TileLayer } from "react-leaflet";
import SearchBar from "../SearchBar";


function MapPage({
    city,
    setCity,
    weather,
    forecast,
    error,
    fetchWeather,
    suggestions,
    map
}) {
    return (
        <div className="App">
                  
            <SearchBar 
                city={city}
                setCity={setCity}
                fetchWeather={fetchWeather}
                title='Precipitation Map'
                suggestions={suggestions}
            />
            {map && weather && 
                <div className="WeatherData">
                    <MapContainer 
                        center={[weather.coord.lat, weather.coord.lon]} 
                        zoom={6} 
                        style={{ height: "70vh", width: "100%"}}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="© OpenStreetMap contributors"
                        />
                        <TileLayer
                            url={map}
                            attribution='Weather data &copy; OpenWeatherMap'
                        />
                    </MapContainer>
                </div>
            }
        </div>
    );
}

export default MapPage;