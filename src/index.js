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

  getForecast(response.data.city);
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

function formatDay(stamp) {
  let date = new Date(stamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  let forecast = document.querySelector("#forecast");
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="row">
        <div class="col-1">
          <div class="weather-forecast-date"> ${formatDay(day.time)} </div>
            <img
              src="${day.condition.icon_url}"
              alt="icon"
              width="60"
              height="60"
            />
            <div class="weather-forecast-temperature">
              <span class="max">${Math.round(day.temperature.maximum)}</span>°
              <span class="min-temp"> <span class="min">${Math.round(
                day.temperature.minimum
              )}</span>°</span>
            </div>
          </div>
        </div>
    </div>`;
    }
  });

  forecast.innerHTML = forecastHTML;
}

function getForecast(city) {
  let apiKey = "te015e3a1bdea7604234a21223o5f7af";
  Url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(Url).then(displayForecast);
}
let searchElement = document.querySelector("#searchForm");
searchElement.addEventListener("submit", searchSubmit);

searchCity("Johannesburg");
