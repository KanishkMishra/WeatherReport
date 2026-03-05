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

        const chosen = suggestions.find((c) => 
          [c.name, c.state, c.country].filter(Boolean).join(",") === city
        );

        fetchWeather(chosen);
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
              value={[city.name, city.state, city.country].filter(Boolean).join(",")}
              />          
        ))}
        </datalist>

        <button type="submit">Search Weather</button>
      </form>
    );

}

export default SearchBar;