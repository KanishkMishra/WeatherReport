import { useState, useEffect } from "react";


function SearchBar({
    city, 
    setCity, 
    fetchWeather, 
    title,
    suggestions
}) {
    // Trigger to query weather data
    const queryWeather = (e) => {
        e.preventDefault();
        fetchWeather(city);
    };

    return (
      <form className='UserInput' onSubmit={queryWeather}>
        <h3>{title}</h3>
        <input
          type="text"
          placeholder='Input City Name'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          list="cities"
        />

        <datalist id="cities">
          {suggestions.map((city, index) => (
            <option
              key={index}
              value={`${city.name},${city.country}`}
            />
          ))}
        </datalist>

        <button type="submit">Search Weather</button>
      </form>
    );

}

export default SearchBar;