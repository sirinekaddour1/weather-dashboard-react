
/* I create an ErrorMessage component to display
   an error when the weather data cannot be loaded. */

// I receive the error message and retry function
// as props from the App component.
export default function ErrorMessage({ message, onRetry }) {

  return (
    <div className="error-message" role="alert">

      {/* I display the error message to the user. */}
      <p>{message}</p>

      {/* I add a button to allow the user
          to try fetching the weather data again. */}
      <button
        type="button"
        onClick={onRetry}
        className="retry-btn"
      >
        Try again
      </button>

    </div>
  );
}
