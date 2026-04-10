# WeatherReport

WeatherReport is a React-based web application that provides real-time weather data, hourly forecasts, multi-day forecasts, and interactive weather maps using the OpenWeatherMap API.

## Features

### Current Weather

* Displays temperature, “feels like”, humidity, pressure, and wind
* Shows weather conditions with icons
* Displays the local time of the selected city

### Hourly Forecast

* Displays upcoming weather at regular time intervals
* Shows temperature and conditions for each interval

### 5-Day Forecast

* Aggregates forecast data into daily summaries
* Displays daily minimum and maximum temperatures
* Determines a representative weather condition for each day

### Weather Map

* Interactive map built with React Leaflet
* Base map provided by OpenStreetMap
* Toggleable weather layers:

  * Precipitation
  * Clouds
  * Temperature
  * Wind
  * Pressure

### Search Functionality

* City autocomplete using the OpenWeatherMap Geocoding API
* Supports multiple cities with the same name by using geographic coordinates
* Ensures accurate weather retrieval based on selected location

### Data Handling

* Stores the last searched location using localStorage
* Automatically fetches weather data on refresh

## Technologies Used

* React
* React Router
* React Leaflet
* OpenWeatherMap API (Weather, Forecast, Geocoding)
* OpenStreetMap
