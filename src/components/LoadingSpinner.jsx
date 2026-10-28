
/* I create a LoadingSpinner component to show
   a loading message while fetching weather data. */

export default function LoadingSpinner() {

  return (
    <div className="loading">

      {/* I display a spinner while the data is loading. */}
      <div className="spinner"></div>

      {/* I inform the user that the weather data is loading. */}
      <p>Loading weather data...</p>

    </div>
  );
}
