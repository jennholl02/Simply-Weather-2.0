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

console.log(cityInput);
