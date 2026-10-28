
import { useState } from "react";

// I create a SearchBar component to allow users to search for a city.
// I receive onSearch and loading as props from the App component.
export default function SearchBar({ onSearch, loading }) {

  // use useState to store the city entered by the user.
  const [city, setCity] = useState("");

  // create a function to handle the form submission.
  function handleSubmit(event) {

    // prevent the page from refreshing when the form is submitted.
    event.preventDefault();

    // send the entered city to the parent App component.
    onSearch(city.trim());
  }

  return (
    <form id="weather-form" onSubmit={handleSubmit}>

      {/* add a label for the city input field. */}
      <label htmlFor="city-input">Enter a city:</label>

      <div className="search-box">

        {/* create a controlled input to enter a city name. */}
        <input
          type="text"
          id="city-input"
          placeholder="e.g. Beirut"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          required
        />

        {/* disable the search button while the weather is loading. */}
        <button
          type="submit"
          id="search-btn"
          disabled={loading}
        >
          Search
        </button>

      </div>
    </form>
  );
}
