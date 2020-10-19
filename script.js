
function formatDate(date) {
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = currentTime.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[dayIndex];
  return `${days[dayIndex]} ${hours}:${minutes}`;
}


function displayWeatherCondition(response) {
document.querySelector("#city").innerHTML = response.data.name;
document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#description").innerHTML = response.data.weather[0].main;
}


function searchCity(city) {
 let apiKey = "961667857ac92e50fc2594f42d82b1ee"; 
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
 axios.get(apiUrl).then(displayWeatherCondition);

}
function handleSubmit(event) {
  event.preventDefault();
   let city = document.querySelector("#city-input").value;
searchCity(city);
}



//


function getCurrentLocation(event) {
event.preventDefault();
navigator.geolocation.getCurrentPosition(searchLocation);

}

function searchLocation(position) {
let latitude = position.coords.latitude;
let longitude = position.coords.longitude;
let units = "metric";
let apiKey = "961667857ac92e50fc2594f42d82b1ee"; 
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(displayCurrentConditions);

}


function displayCurrentConditions(response) {
let temperature = Math.round(response.data.main.temp)
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = `${temperature}`


}

searchCity("Vancouver");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);


let dateElement = document.querySelector("#date");
let currentTime = new Date();

dateElement.innerHTML = formatDate(currentTime);





