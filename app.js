const api = {
  key: "1541d7807f0e910ae9761f8435510cc9",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', addQueries);

function addQueries(event) {
  if (event.keyCode == 13) { //13 is the keycode for enter
    getvalues(searchbox.value);
  }
}

function getvalues (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => { //here weather is a variable which stores the values
      return weather.json();
    }).then(displayResults);
}
var options={
  weekday:"long",
  day:"numeric",
  month:"long"
};
var today = new Date();
var day=today.toLocaleDateString("en-US",options);
function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`; // use ` ` instead of '' since the later will make the contents a part of the string

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = day;

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`; //$ helps to put the value instead of becoming a string

  let tempicon = document.querySelector('.current .icon');
  tempicon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" >`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}
