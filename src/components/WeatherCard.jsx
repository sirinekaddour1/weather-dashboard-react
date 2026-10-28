
/* I create a function to get the weather
   description and icon based on the weather code. */
function getWeatherInfo(code) {

  // check if the sky is clear.
  if (code === 0) {
    return { description: "Clear sky", icon: "☀️" };
  }

  // check if the sky is cloudy.
  if (code >= 1 && code <= 3) {
    return { description: "Partly cloudy", icon: "⛅" };
  }

  // check if there is fog.
  if (code === 45 || code === 48) {
    return { description: "Foggy", icon: "🌫️" };
  }

  // check if there is rain.
  if (code >= 51 && code <= 67) {
    return { description: "Rainy", icon: "🌧️" };
  }

  // check if there is snow.
  if (code >= 71 && code <= 77) {
    return { description: "Snowy", icon: "❄️" };
  }

  // check if there are rain showers.
  if (code >= 80 && code <= 82) {
    return { description: "Rain showers", icon: "🌦️" };
  }

  // check if there are snow showers.
  if (code >= 85 && code <= 86) {
    return { description: "Snow showers", icon: "🌨️" };
  }

  // check if there is a thunderstorm.
  if (code >= 95 && code <= 99) {
    return { description: "Thunderstorm", icon: "⛈️" };
  }

  // check if there is unknown weather.
  return { description: "Unknown weather", icon: "🌤️" };
}

// I create a component to display the weather information.
// I receive the weather data from App using props.
export default function WeatherCard({ data }) {

  // get the current weather data.
  const current = data.current;

  // get the description and icon.
  const weather = getWeatherInfo(current.weather_code);

  return (
    <section id="weather-result">

      {/* I display the city and country. */}
      <h2 id="city-name">
        {data.name}, {data.country}
      </h2>

      <div className="current-weather">

        {/* I display the weather icon. */}
        <span
          id="weather-icon"
          role="img"
          aria-label={weather.description}
        >
          {weather.icon}
        </span>

        <div>
          {/* I display the current temperature. */}
          <h3 id="temperature">
            {Math.round(current.temperature_2m)}°C
          </h3>

          {/* I display the weather description. */}
          <p id="description">
            {weather.description}
          </p>
        </div>

      </div>

      {/* I display additional weather details. */}
      <div className="details">

        <div className="detail-card">
          <h4>Humidity</h4>
          <p id="humidity">
            {current.relative_humidity_2m}%
          </p>
        </div>

        <div className="detail-card">
          <h4>Wind Speed</h4>
          <p id="wind">
            {current.wind_speed_10m} km/h
          </p>
        </div>

        <div className="detail-card">
          <h4>Feels Like</h4>
          <p id="feels-like">
            {Math.round(current.apparent_temperature)}°C
          </p>
        </div>

      </div>

    </section>
  );
}
