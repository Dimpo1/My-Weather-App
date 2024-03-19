function changeValues(response) {
  let temperatureElement = document.querySelector("#temp");
  currentTemperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(currentTemperature);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windElement = document.querySelector("#windSpeed");
  windElement.innerHTML = response.data.wind.speed;

  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon" />`;

  let time = document.querySelector("#dateTime");
  let date = new Date(response.data.time * 1000);
  time.innerHTML = formatDate(date);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
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
