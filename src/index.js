// Feature 1
let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let current = document.querySelector("#time-date");
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
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let monthNow = months[now.getMonth()];
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

current.innerHTML = `${day}, ${dateNow} ${monthNow}, ${hours}:${minutes}`;

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

  celciusTemperature = response.data.main.temp;

  temperature.innerHTML = `${temp}`;
  weather.innerHTML = response.data.weather[0].main;
  feelsLike.innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
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

//Forecast

function displayForecast(response) {
  console.log(response.data);
}
//City search
function showCity(response) {
  document.querySelector("#inputcity").innerHTML = response.data.name;
}

function getPosition(position) {
  let apiKey = `e8afed4d9a3d0f7582b3f63e5e950faf`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

navigator.geolocation.getCurrentPosition(getPosition);

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#inputcity");
  let city = `${searchInput.value}`;
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = city;
  if (searchInput.value) {
    currentCity.innerHTML = city;
  } else {
    alert("Enter a city...😎");
    currentCity.innerHTML = null;
  }
  let apiKey = `e8afed4d9a3d0f7582b3f63e5e950faf`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&mode=xml&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#inputcity");
  searchCity(cityInputElement.value);
}

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

let form = document.querySelector("#search-button");
form.addEventListener("submit", searchCity);

let fahrenheitLink = document.querySelector("#unitF");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celciusLink = document.querySelector("#unitC");
celciusLink.addEventListener("click", showCelciusTemperature);
