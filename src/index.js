function searchSubmit(event) {
  event.preventDefault();
  let citySearchInput = document.querySelector("#citySearch");
  let cityElement = document.querySelector("#myCity");
  console.log(cityElement);
  cityElement.innerHTML = citySearchInput.value;
}
let searchElement = document.querySelector("#searchForm");
searchElement.addEventListener("submit", searchSubmit);
