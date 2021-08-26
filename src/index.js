let date = new Date();
let today = date.getDate();

let hour = date.getHours();
let ampm = hour >= 12 ? "pm" : "am";
hour = hour % 12;
hour = hour ? hour : 12;

let minutes = date.getMinutes();
minutes = minutes < 10 ? "0" + minutes : minutes;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[date.getDay()];

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
let month = months[date.getMonth()];

let currentDateTime = document.querySelector("#time-date-updated");
currentDateTime.innerHTML = `${day}, ${month} ${today} at ${hour}:${minutes} ${ampm}`;

function displayDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

function displayFutureForecast(response) {
  let dailyForecast = response.data.daily;

  let forecastElement = document.querySelector("#four-day-forecast");

  let forecastHTML = `<div class="row">`;
  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col">
                <div class="future-date">${displayDay(forecastDay.dt)}</div>
                <div class="future-weather-image"><img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="Weather-Icon" id="future-weather-image"/></div>
                  <div class="forecast-highlow"><span class="future-high">${Math.round(
                    forecastDay.temp.max
                  )}°</span><span class="future-low"> ${Math.round(
          forecastDay.temp.min
        )}°</span></div>   
          </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "9eb0f850fd87a403bc76584028e843ca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayFutureForecast);
}

function showForecastElements(response) {
  let city = response.data.name;
  let insertCity = document.querySelector("#city-name");
  insertCity.innerHTML = `${city}`;

  let currentTemp = Math.round(response.data.main.temp);
  let insertTemp = document.querySelector("#current-temp");
  insertTemp.innerHTML = `${currentTemp} ℉`;

  let currentRealFeel = Math.round(response.data.main.feels_like);
  let insertRealFeel = document.querySelector("#current-real-feel");
  insertRealFeel.innerHTML = `${currentRealFeel}℉`;

  let currentDescription = response.data.weather[0].description;
  let insertDescription = document.querySelector("#current-description");
  insertDescription.innerHTML = `${currentDescription}`;

  let currentWind = Math.round(response.data.wind.speed);
  let insertWind = document.querySelector("#current-wind");
  insertWind.innerHTML = `${currentWind} mph`;

  let currentHumidity = response.data.main.humidity;
  let insertHumdiity = document.querySelector("#current-humidity");
  insertHumdiity.innerHTML = `${currentHumidity} %`;

  let currentHigh = Math.round(response.data.main.temp_max);
  let insertHigh = document.querySelector("#current-high");
  insertHigh.innerHTML = `${currentHigh} ℉`;

  let currentLow = Math.round(response.data.main.temp_min);
  let insertLow = document.querySelector("#current-low");
  insertLow.innerHTML = `${currentLow} ℉`;

  let currentImage = document.querySelector("#current-image");
  currentImage.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "9eb0f850fd87a403bc76584028e843ca";
  let units = "imperial";
  let endpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${endpoint}?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showForecastElements);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search-input");
  search(cityInput.value);
  cityInput.value = "";
}

let citySearch = document.querySelector("#city-form");
citySearch.addEventListener("submit", handleSubmit);

function showCurrentLocation(position) {
  let apiKey = "9eb0f850fd87a403bc76584028e843ca";
  let units = "imperial";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let endpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${endpoint}?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showForecastElements);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let currentLocation = document.querySelector("#location-submit-button");
currentLocation.addEventListener("click", getCurrentPosition);

search("Denver");
