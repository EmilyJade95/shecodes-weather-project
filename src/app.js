// Display Correct Date
function showDate() {
  let currentDate = document.querySelector(".current-date");
  let currentTime = document.querySelector(".current-time");
  currentDate.innerHTML = `${day} ${month} ${date}`;
  currentTime.innerHTML = `${hour}:${minutes}`;
}
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
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
let day = days[now.getDay()];
let date = now.getDate();

let month = months[now.getMonth()];
let hour = now.getHours();
if (hour <= 9) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes <= 9) {
  minutes = `0${minutes}`;
}

showDate();

//Add Search Engine Functionality
function showCurrentTemperature(response) {
  let currentCity = response.data.name;
  let currentCountry = response.data.sys.country;
  let currentTemp = Math.round(response.data.main.temp);
  let currentHumidity = Math.round(response.data.main.humidity);
  let weatherDescription = response.data.weather[0].description;
  let h1 = document.querySelector("h1");
  let todayTemp = document.querySelector(".today-temp");
  let humidity = document.querySelector(".humidity");
  let weatherDesc = document.querySelector(".weather-desc");
  h1.innerHTML = `${currentCity}, ${currentCountry}`;
  todayTemp.innerHTML = `${currentTemp}`;
  humidity.innerHTML = `Humidity: ${currentHumidity}%`;
  weatherDesc.innerHTML = `${weatherDescription}`;
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  let searchedCity = cityInput.value;
  let apiKey = "c8735bb7e8e2f8d8a38c7501f3cd47d3";
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=metric`;
  axios.get(weatherApiUrl).then(showCurrentTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

//Add Use my current location button
function showGeoLocatedTemperature(response) {
  let currentCity = response.data.name;
  let currentCountry = response.data.sys.country;
  let currentTemp = Math.round(response.data.main.temp);
  let currentHumidity = Math.round(response.data.main.humidity);
  let weatherDescription = response.data.weather[0].description;
  let h1 = document.querySelector("h1");
  let todayTemp = document.querySelector(".today-temp");
  let humidity = document.querySelector(".humidity");
  let weatherDesc = document.querySelector(".weather-desc");
  h1.innerHTML = `${currentCity}, ${currentCountry}`;
  todayTemp.innerHTML = `${currentTemp}`;
  humidity.innerHTML = `Humidity: ${currentHumidity}%`;
  weatherDesc.innerHTML = `${weatherDescription}`;
}

function showCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c8735bb7e8e2f8d8a38c7501f3cd47d3";
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(weatherApiUrl).then(showGeoLocatedTemperature);
}

function findCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", findCurrentLocation);
