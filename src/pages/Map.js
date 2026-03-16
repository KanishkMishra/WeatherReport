import { MapContainer, TileLayer } from "react-leaflet";
import { LayersControl } from "react-leaflet";
import SearchBar from "../SearchBar";


function MapPage({
    city,
    setCity,
    weather,
    forecast,
    error,
    fetchWeather,
    suggestions,
    freeAPIKey
}) {
    return (
        <div className="App">
                  
            <SearchBar 
                city={city}
                setCity={setCity}
                fetchWeather={fetchWeather}
                title='Weather Map'
                suggestions={suggestions}
            />
            {freeAPIKey && weather && (() => {
                const savedLocation =  JSON.parse(localStorage.getItem("location"));
                const { BaseLayer, Overlay } = LayersControl;
                return (
                <div className="WeatherData">
                    <h2>{[savedLocation.name, savedLocation.state, savedLocation.country].filter(Boolean).join(",")}</h2>
                    
                    <MapContainer 
                        center={[weather.coord.lat, weather.coord.lon]} 
                        zoom={10} 
                        style={{ height: "55vh", width: "90%"}}
                    >
                        <LayersControl position="topright">
                            <BaseLayer checked name="Map">
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution="© OpenStreetMap contributors"
                                />
                            </BaseLayer>

                            <Overlay name="Precipitation">
                                <TileLayer
                                    url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${freeAPIKey}`}
                                    attribution='Weather data &copy; OpenWeatherMap'
                                />
                            </Overlay>

                            <Overlay name="Clouds">
                                <TileLayer
                                    url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${freeAPIKey}`}
                                    attribution='Weather data &copy; OpenWeatherMap'
                                />
                            </Overlay> 

                            <Overlay name="Temperature">
                                <TileLayer
                                    url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${freeAPIKey}`}
                                    attribution='Weather data &copy; OpenWeatherMap'
                                />
                            </Overlay>

                            <Overlay name="Wind">
                                <TileLayer
                                    url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${freeAPIKey}`}
                                    attribution='Weather data &copy; OpenWeatherMap'
                                />
                            </Overlay>

                            <Overlay name="Pressure">
                                <TileLayer
                                    url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${freeAPIKey}`}
                                    attribution='Weather data &copy; OpenWeatherMap'
                                />
                            </Overlay>

                        </LayersControl>
                    </MapContainer>
                </div>
            )})()}
        </div>
    );
}

export default MapPage;