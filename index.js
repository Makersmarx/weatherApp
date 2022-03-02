// props
const renderThis = document.getElementById('weather');
const today = document.querySelector('.today');
const tomorrow = document.querySelector('.tomorrow');
const thirdDay = document.querySelector('.thirdDay');
const temps = document.querySelector('.temps');
const tempsTwo = document.querySelector('.tempsTwo');
const tempsThree = document.querySelector('.tempsThree');
const weatherIcon = document.querySelector('.icon');
const weatherIconTwo = document.querySelector('.iconTwo');
const weatherIconThree = document.querySelector('.iconThree');
// Note all temps return same max / low

// Test data used in url to get data
const zipCode = 45449;

// URL used in call to get lat lon zip
const getLatLonURL = `https://se-weather-api.herokuapp.com/api/v1/geo?zip_code=${zipCode}`;

const weather = async () => {
  try {
    // get lat an lon
    const response = await fetch(getLatLonURL);
    const data = await response.json();
    const weather = {
      lat: data.lat,
      long: data.lon,
    };
    document.querySelector(
      '.header'
    ).textContent = `Weather Forecast For ${data.city}, ${data.region} `;
    console.log(data);
    // use above lat lon for call to get local weather fro city
    const getWeatherURL = `https://se-weather-api.herokuapp.com/api/v1/forecast?latitude=${
      weather.lat
    }&longitude=${weather.long}&date=${new Date()}`;

    const resWeather = await fetch(getWeatherURL);

    const weatherData = await resWeather.json();
    console.log(weatherData);

    // render todays weather
    // console.log(weatherData.daily.data[0].icon);
    if (weatherData.daily.data[0].icon === 'cloudy') {
      weatherIcon.className = 'fa-solid fa-cloud';
    } else if (weatherData.daily.data[0].icon === 'sunny') {
      weatherIcon.className = 'fa-solid fa-sun';
    } else if (weatherData.daily.data[0].icon === 'rain') {
      weatherIcon.className = 'fa-solid fa-cloud-rain';
    } else if (weatherData.daily.data[0].icon === 'snow') {
      weatherIcon.className = 'fa-solid fa-snowflake';
    } else {
      weatherIcon.className = 'fa-solid fa-cloud-bolt-sun';
    }
    today.innerText = weatherData.daily.data[0].summary;
    temps.innerText = `${Math.round(
      weatherData.daily.data[0].temperatureLow
    )} / ${Math.round(weatherData.daily.data[0].temperatureHigh)}° F`;

    // render tomorrows weather
    //console.log(weatherData.daily.data[1].icon);
    if (weatherData.daily.data[1].icon === 'cloudy') {
      weatherIconTwo.className = 'fa-solid fa-cloud';
    } else if (weatherData.daily.data[1].icon === 'sunny') {
      weatherIconTwo.className = 'fa-solid fa-sun';
    } else if (weatherData.daily.data[1].icon === 'rain') {
      weatherIconTwo.className = 'fa-solid fa-cloud-rain';
    } else if (weatherData.daily.data[1].icon === 'snow') {
      weatherIconTwo.className = 'fa-solid fa-snowflake';
    } else {
      weatherIconTwo.className = 'fa-solid fa-cloud-bolt-sun';
    }
    tomorrow.innerText = weatherData.daily.data[1].summary;
    tempsTwo.innerText = `${Math.round(
      weatherData.daily.data[1].temperatureLow
    )} / ${Math.round(weatherData.daily.data[1].temperatureHigh)}° F`;

    //render third day weather
    // console.log(weatherData.daily.data[2].icon);
    if (weatherData.daily.data[2].icon === 'cloudy') {
      weatherIconThree.className = 'fa-large fa-solid fa-cloud';
    } else if (weatherData.daily.data[2].icon === 'sunny') {
      weatherIconThree.className = 'fa-solid fa-sun';
    } else if (weatherData.daily.data[2].icon === 'rain') {
      weatherIconThree.className = 'fa-solid fa-cloud-rain';
    } else if (weatherData.daily.data[2].icon === 'snow') {
      weatherIconThree.className = 'fa-solid fa-snowflake';
    } else {
      weatherIconThree.className = 'fa-solid fa-cloud-bolt-sun';
    }
    thirdDay.innerText = weatherData.daily.data[2].summary;
    tempsThree.innerText = `${Math.round(
      weatherData.daily.data[2].temperatureLow
    )} / ${Math.round(weatherData.daily.data[2].temperatureHigh)}° F`;
  } catch (error) {
    console.log(error);
  }
};
weather();
