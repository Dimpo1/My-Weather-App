function changeValues(response) {
  let temperatureElement = document.querySelector("#temp");
  currentTemperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(currentTemperature);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
}

function searchCity(city) {
  let Key = "te015e3a1bdea7604234a21223o5f7af";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${Key}`;
  axios.get(apiUrl).then(changeValues);
}

function searchSubmit(event) {
  event.preventDefault();
  let citySearchInput = document.querySelector("#citySearch");

  searchCity(citySearchInput.value);
}
let searchElement = document.querySelector("#searchForm");
searchElement.addEventListener("submit", searchSubmit);

searchCity("Johannesburg");
