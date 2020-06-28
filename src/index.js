// Feature 1
function formatDate(timestamp) {
  let now = new Date(timestamp);
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let monthNow = months[now.getMonth()];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let dateNow = now.getDate();
  return `${day}, ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}
//Forecast

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="https://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
        class="sub-icons"
        width ="65px"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}
//Update current city and temperature

function showWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temp");
  let weather = document.querySelector("#weather-condition");
  let feelsLike = document.querySelector("#feels");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let city = document.querySelector("#city");
  let iconElement = document.querySelector("#main-icon");
  let dateElement = document.querySelector("#time-date");

  celciusTemperature = response.data.main.temp;
  temperature.innerHTML = `${temp}`;
  weather.innerHTML = response.data.weather[0].description;
  feelsLike.innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )}`;
  dateElement.innerHTML = `Last updated: ${formatDate(
    response.data.dt * 1000
  )}`;
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}`;
  city.innerHTML = `${response.data.name},${response.data.sys.country}`;
  console.log(response.data);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
//City search
function searchCity(city) {
  event.preventDefault();
  let searchInput = document.querySelector("#inputcity").value;
  let apiKey = `e8afed4d9a3d0f7582b3f63e5e950faf`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#inputcity").value;
  searchCity(city);

  let searchInput = document.querySelector("#inputcity");
  let currentCity = document.querySelector("#city");

  if (searchInput.value) {
    currentCity.innerHTML = `${searchInput.value}`;
  } else {
    currentCity.innerHTML = null;
    alert("Type a city...😎");
  }
}
let button = document.querySelector("#search-button");
button.addEventListener("click", handleSubmit);

//Get position
function getPosition(position) {
  let apiKey = `e8afed4d9a3d0f7582b3f63e5e950faf`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;
  axios.get(`${api}&appid=${apiKey}`).then(showWeather);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

navigator.geolocation.getCurrentPosition(getPosition);

//Temperature
function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  //remove active class from C link
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelciusTemperature(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let fahrenheitLink = document.querySelector("#unitF");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celciusLink = document.querySelector("#unitC");
celciusLink.addEventListener("click", showCelciusTemperature);

searchCity("Copenhagen");
