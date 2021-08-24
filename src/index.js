//form = city-form
//input = city-search-bar
//city= city-name

function cityInput(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search-input");

  let cityNameInput = document.querySelector("#city-name");
  cityNameInput.innerHTML = `${citySearch.value}`;
}
let searchBar = document.querySelector("#city-form");
searchBar.addEventListener("submit", cityInput);

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
