
/* URL used to find the coordinates of a city */
const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";

/* URL used to get the weather information */
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

/* Function to get JSON data from an API */
async function getJSON(url) {

  try {

    // I send a request to the API and wait for the response.
    const response = await fetch(url);

    // I check if the HTTP request failed.
    if (!response.ok) {

      // I check if too many requests were made.
      if (response.status === 429) {
        throw new Error("Too many requests. Please try later.");
      }

      // I create an error if the HTTP request fails.
      throw new Error(`HTTP error: ${response.status}`);
    }

    // I convert the JSON response into JavaScript data.
    return await response.json();

  } catch (error) {

    // I check if there is a network-related failure.
    if (error instanceof TypeError) {

      // I show a friendly error and keep the original error.
      throw new Error("Network error. Check your connection.", {
        cause: error
      });
    }

    // I send other errors to the calling function.
    throw error;
  }
}

/* Function to get weather data for a city */
export async function loadWeather(city) {

  // I create parameters to search for the city.
  const geoParams = new URLSearchParams({
    name: city, // city entered by the user
    count: "1", // get only the first matching city
    language: "en", // use English for the results
    format: "json" // request JSON data
  });

  // I fetch the geographical information of the city.
  const geoData = await getJSON(`${GEO_URL}?${geoParams}`);

  // I check if the city exists.
  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("City not found. Please try another name.");
  }

  // I select the first matching city.
  const location = geoData.results[0];

  // I get the city's latitude and longitude.
  const latitude = location.latitude;
  const longitude = location.longitude;

  // I create parameters for the weather API.
  const weatherParams = new URLSearchParams({

    // I send the city's coordinates.
    latitude: String(latitude),
    longitude: String(longitude),

    // I choose the current weather information I need.
    current: [
      "temperature_2m", // current temperature
      "relative_humidity_2m", // humidity percentage
      "apparent_temperature", // feels-like temperature
      "wind_speed_10m", // wind speed
      "weather_code" // weather condition code
    ].join(","),

    // I automatically use the city's timezone.
    timezone: "auto"
  });

  // I fetch the current weather information.
  const weatherData = await getJSON(`${WEATHER_URL}?${weatherParams}`);

  // I check if the weather information is missing.
  if (!weatherData.current) {
    throw new Error("Weather data is unavailable.");
  }

  // I return the weather information to the App component.
  return {
    name: location.name, // city name
    country: location.country, // country name
    current: weatherData.current // current weather data
  };
}
