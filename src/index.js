//form = city-form
//input = city-search-bar
//city= city-name

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search-bar");

  let namePlacement = document.querySelector("#city-name");
  namePlacement.innerHTML = `${searchInput.value}`;

  let citySearch = document.querySelector("#city-form");
  citySearch.addEventListener("submit", searchCity);
}
