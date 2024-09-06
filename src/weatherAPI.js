function displayData(data) {
  const tempDiv = document.querySelector(".temp");
  tempDiv.textContent = `Current temperature: ${data.currentConditions.temp}°F`;
}

function showLoadingIndicator(show) {
  const loadingDiv = document.querySelector(".loading");
  loadingDiv.style.display = show ? "block" : "none";
}

async function getWeather(city, state) {
  try {
    showLoadingIndicator(true);
    // Construct the API URL using template literals
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}%20${encodeURIComponent(state)}?unitGroup=us&key=FPQDG2F8LFHE8S95BAGRZ9VXV&contentType=json`;

    const response = await fetch(apiUrl, { mode: "cors" });
    const data = await response.json();
    console.log(data.currentConditions.temp);
    displayData(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  } finally {
    showLoadingIndicator(false); // Hide loading indicator regardless of success or failure
  }
}

function captureUserInput() {
  const button = document.querySelector("button");
  const inputCity = document.querySelector("#city");
  const inputState = document.querySelector("#state");

  button.addEventListener("click", (e) => {
    e.preventDefault();
    const city = inputCity.value;
    const state = inputState.value;

    getWeather(city, state);
  });
}

export default captureUserInput;
