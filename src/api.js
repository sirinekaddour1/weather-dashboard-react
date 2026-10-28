/* URL used to find the coordinates of a city */
const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";

/* URL used to get the weather information */
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

/* Function to get JSON data from an API */
async function getJSON(url) {

  try { 

    const response = await fetch(url); // send request and wait for response

    if (!response.ok) { // check if the HTTP request failed

      if (response.status === 429) { // check if too many requests were made
        throw new Error("Too many requests. Please try later."); // show rate limit error
      }

      throw new Error(`HTTP error: ${response.status}`); // create an HTTP error
    }

    return await response.json(); // convert the JSON response into JavaScript data

  } catch (error) { // catch network or HTTP errors

    if (error instanceof TypeError) { // check for a network-related failure
      throw new Error("Network error. Check your connection."); // show a friendly error
    }

    throw error; // send other errors to the calling function
  }
}

/* Function to get weather data for a city */
export async function loadWeather(city) {

  const geoParams = new URLSearchParams({ // create parameters for the city search
    name: city, // city entered by the user
    count: "1", // get only the first matching city
    language: "en", // use English for the results
    format: "json" // request JSON data
  });

  const geoData = await getJSON(`${GEO_URL}?${geoParams}`); // get city coordinates

  if (!geoData.results || geoData.results.length === 0) { // check if the city exists
    throw new Error("City not found. Please try another name."); // show an error
  }

  const location = geoData.results[0]; // select the first matching city

  const latitude = location.latitude; // get the city's latitude
  const longitude = location.longitude; // get the city's longitude

  const weatherParams = new URLSearchParams({ // create parameters for the weather API

    latitude: String(latitude), // send the latitude
    longitude: String(longitude), // send the longitude

    current: [ // choose the current weather data we need
      "temperature_2m", // current temperature
      "relative_humidity_2m", // Humidity percentage
      "apparent_temperature", // Feels-like temperature
      "wind_speed_10m", // Wind speed
      "weather_code" // code describing the weather condition
    ].join(","), // convert the list into a comma-separated string

    timezone: "auto" // automatically use the city's timezone
  });

  const weatherData = await getJSON(`${WEATHER_URL}?${weatherParams}`); // get weather data

  if (!weatherData.current) { // check if the weather data is missing
    throw new Error("Weather data is unavailable."); // show an error
  }

  return { // return the information needed by the application
    name: location.name, // city name
    country: location.country, // country name
    current: weatherData.current // current weather information
  };
}
