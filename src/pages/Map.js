import { MapContainer, TileLayer } from "react-leaflet";
import { useState } from "react";
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
    const [activeLayers, setActiveLayers] = useState({
        precipitation: true,
        clouds: false,
        temp: false,
        wind: false,
        pressure: false
    });

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
                        zoom={6} 
                        style={{ height: "55vh", width: "90%"}}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

                        {activeLayers.precipitation &&  <TileLayer url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${freeAPIKey}`}/>}
                        {activeLayers.clouds &&         <TileLayer url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${freeAPIKey}`}/>}
                        {activeLayers.temp &&           <TileLayer url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${freeAPIKey}`}/>}
                        {activeLayers.wind &&           <TileLayer url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${freeAPIKey}`}/>}
                        {activeLayers.pressure &&       <TileLayer url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${freeAPIKey}`}/>}

                    </MapContainer>
                    <div className="layerControls">
                        <label><input type="checkbox" checked={activeLayers.precipitation} onChange={() => setActiveLayers(prev => ({ ...prev, precipitation: !prev.precipitation }))}/>Precipitation</label>
                        <label><input type="checkbox" checked={activeLayers.clouds} onChange={() => setActiveLayers(prev => ({ ...prev, clouds: !prev.clouds }))}/>Clouds</label>
                        <label><input type="checkbox" checked={activeLayers.temp} onChange={() => setActiveLayers(prev => ({ ...prev, temp: !prev.temp }))}/>Temperature</label>
                        <label><input type="checkbox" checked={activeLayers.wind} onChange={() => setActiveLayers(prev => ({ ...prev, wind: !prev.wind }))}/>Wind</label>
                        <label><input type="checkbox" checked={activeLayers.pressure} onChange={() => setActiveLayers(prev => ({ ...prev, pressure: !prev.pressure }))}/>Pressure</label>
                    </div>
                </div>
            )})()}
        </div>
    );
}

export default MapPage;