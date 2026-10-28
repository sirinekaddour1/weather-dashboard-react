# Weather Dashboard — Assignment 5

## Project Description

I rebuilt my previous Weather Dashboard as a React application using Vite.

The application allows users to search for a city and view its current weather conditions.

## Technologies Used

- React
- JavaScript
- Vite
- HTML and CSS
- Weather API

## React Components

I divided my application into four reusable components:

1. **SearchBar:** Allows the user to enter and search for a city.
2. **WeatherCard:** Displays the temperature, weather description, humidity, wind speed, and feels-like temperature.
3. **LoadingSpinner:** Displays a loading indicator while fetching weather data.
4. **ErrorMessage:** Displays an error message and provides a Try again button.

## React Hooks

I used `useState` to manage the city, weather data, loading state, error message, and retry counter.

I used `useEffect` to fetch weather data whenever the city or retry counter changes.

## Props

I used props to pass data and functions from the parent `App` component to its child components.

The state is managed in `App`, while `SearchBar` also manages its own input state. No prop drilling beyond one component level is needed.

## Installation and Running the Project

1. Download or clone the project.
2. Open the project folder in VS Code.
3. Open the terminal.
4. Install the dependencies:

```bash
npm install
```

5. Start the development server:

```bash
npm run dev
```

6. Open the local URL displayed in the terminal.

## Features

- Search for a city
- Display current weather information
- Display loading and error states
- Retry a failed search
- Responsive user interface

## Project Structure

```text
src/
  components/
    SearchBar.jsx
    WeatherCard.jsx
    LoadingSpinner.jsx
    ErrorMessage.jsx
  api.js
  App.jsx
  App.css
  index.css
  main.jsx
```

## Conclusion

This assignment helped me understand how to organize a React application into reusable components, manage state using React hooks, fetch data from APIs, and communicate between components using props.
