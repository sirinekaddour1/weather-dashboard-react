
import { useState, useEffect } from "react";

// I import the function from my previous Weather Dashboard.
import { loadWeather } from "./api.js";

// I import the four React components.
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";

import "./App.css";

// I create the main App component.
export default function App() {

  // I use useState to store the city selected by the user.
  const [city, setCity] = useState("");

  // I store the weather data received from the API.
  const [weather, setWeather] = useState(null);

  // I use a state to check if the data is loading.
  const [loading, setLoading] = useState(false);

  // I store an error message if something goes wrong.
  const [error, setError] = useState("");

  // I use this state to allow the user to retry a search.
  const [retryCount, setRetryCount] = useState(0);

  // I use useEffect to fetch weather data when the city
  // or the retry counter changes.
  useEffect(() => {

    // I do not fetch data if no city has been selected.
    if (!city) return;

    // I use this variable to ignore outdated requests.
    let ignore = false;

    // I create an asynchronous function to fetch weather data.
    async function fetchWeather() {

      // I show the loading component.
      setLoading(true);

      // I clear the previous error and weather data.
      setError("");
      setWeather(null);

      try {

        // I fetch weather data using my previous API function.
        const data = await loadWeather(city);

        // I save the weather data in the state.
        if (!ignore) {
          setWeather(data);
        }

      } catch (error) {

        // I display an error if the request fails.
        if (!ignore) {
          setError(error.message);
        }

      } finally {

        // I stop the loading state when the request finishes.
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    // I call the function to get the weather data.
    fetchWeather();

    // I prevent outdated requests from updating the state.
    return () => {
      ignore = true;
    };

  }, [city, retryCount]);

  // I create a function to handle a new city search.
  function handleSearch(newCity) {

    // I check if the user entered a city.
    if (!newCity) {
      setError("Please enter a city name.");
      return;
    }

    // I update the city and trigger a new search.
    setCity(newCity);
    setRetryCount((count) => count + 1);
  }

  // I create a function to retry the weather request.
  function handleRetry() {

    // I increase the retry counter to trigger useEffect again.
    setRetryCount((count) => count + 1);
  }

  // I reuse the container class from my previous Weather Dashboard.
  return (
    <div className="container">

      <header>
        <h1>Weather Dashboard</h1>
        <p>Search for a city to check the current weather.</p>
      </header>

      {/* I pass the search function and loading state
          to the SearchBar component. */}
      <SearchBar
        onSearch={handleSearch}
        loading={loading}
      />

      {/* I display the spinner while data is loading. */}
      {loading && <LoadingSpinner />}

      {/* I display the error component when an error occurs. */}
      {!loading && error && (
        <ErrorMessage
          message={error}
          onRetry={handleRetry}
        />
      )}

      {/* I display the weather card when data is available. */}
      {!loading && !error && weather && (
        <WeatherCard data={weather} />
      )}

    </div>
  );
}
