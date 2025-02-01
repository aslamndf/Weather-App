let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let forecast = document.querySelector(".weather_forecast");
let icon = document.querySelector(".weather_icon");
let temperature = document.querySelector(".weather_temperature");
let tempMin = document.querySelector(".weather_min");
let tempMax = document.querySelector(".weather_max");

let feelsLike = document.querySelector(".weather_feelsLike");
let humidity = document.querySelector(".weather_humidity");
let wind = document.querySelector(".weather_wind");
let pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");

const getCountryName = (code) => {
  return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000); // Convert seconds to milliseconds
  console.log(curDate);
  // // const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  console.log(formatter);
  return formatter.format(curDate);
};

let city = "Bengaluru";

// search functionality
citySearch.addEventListener("submit", (e) => {
  e.preventDefault();

  let cityName = document.querySelector(".city_name");
  console.log(cityName.value);
  city = cityName.value;

  getWeatherData();

  cityName.value = "";
});

const getWeatherData = async () => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=f4ae9ce89787a098f9e670a1405e02cf`;
  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();
    console.log(data);

    const { main, name, weather, wind, sys, dt } = data;

    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);

    forecast.innerHTML = weather[0].main;
    icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

    temperature.innerHTML = `${main.temp}&#176`;
    tempMin.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
    tempMax.innerHTML = `Min: ${main.temp_max.toFixed()}&#176`;

    feelsLike.innerHTML = `${main.feels_like.toFixed(2)}&#176`;
    humidity.innerHTML = `${main.humidity}%`;
    wind.innerHTML = `${wind.speed} m/s`;
    pressure.innerHTML = `${main.pressure} hPa`;

  } catch (error) {
    console.log(error);
  }
};

document.body.addEventListener("load", getWeatherData());
