import { MapContainer, TileLayer } from "react-leaflet";
import { useState } from "react";
import SearchBar from "../SearchBar";
import Legend from "./Legend"


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

    const [activeLayer, setActiveLayer] = useState("precipitation");

    
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
                return (
                <div className="WeatherData">
                    <h2>{[savedLocation.name, savedLocation.state, savedLocation.country].filter(Boolean).join(",")}</h2>
                    
                    <MapContainer 
                        key={`${weather.coord.lat}-${weather.coord.lon}`}
                        center={[weather.coord.lat, weather.coord.lon]} 
                        zoom={8} 
                        style={{ height: "50vh", width: "90%"}}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

                        {activeLayer === "precipitation" && <TileLayer url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${freeAPIKey}`}/>}
                        {activeLayer === "clouds" &&        <TileLayer url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${freeAPIKey}`}/>}
                        {activeLayer === "temp" &&          <TileLayer url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${freeAPIKey}`}/>}
                        {activeLayer === "wind" &&          <TileLayer url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${freeAPIKey}`}/>}
                        {activeLayer === "pressure" &&      <TileLayer url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${freeAPIKey}`}/>}

                    </MapContainer>
                    <select onChange={(e) => setActiveLayer(e.target.value)} value={activeLayer} className="layerControls">
                        <option value="precipitation">Precipitation</option>
                        <option value="clouds">Clouds</option>
                        <option value="temp">Temperature</option>
                        <option value="wind">Wind</option>
                        <option value="pressure">Pressure</option>
                    </select>
                    <Legend layer={activeLayer}/>
                </div>
            )})()}
        </div>
    );
}

export default MapPage;