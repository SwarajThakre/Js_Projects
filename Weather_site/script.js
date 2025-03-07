document.addEventListener('DOMContentLoaded', function () {
  const apiKey = '026cb15c2bd44f5830ffe6f7353e8d7a';
  const cityInput = document.getElementById('city');
  const cityName = document.getElementById('cityName');
  const temperature = document.getElementById('temperature');
  const description = document.getElementById('description');
  const weatherIcon = document.getElementById('weatherIcon');
  const humidity = document.getElementById('humidity');
  const realFeel = document.getElementById('real-feel');
  const windSpeed = document.getElementById('wind-speed');
  const pressure = document.getElementById('pressure');

  // const defaultCity = 'Mumbai';
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Use the lat and lon to get the city name
    const apiURl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
    fetch(apiURl)
      .then((response) => response.json())
      .then((data) => {
        const city = data.address.city;
        fetchWeatherData(city);
      })
      .catch((error) => console.error('Error getting city name', error));
  });

  cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const city = cityInput.value.trim();
      if (city) {
        fetchWeatherData(city);
      }
    }
  });

  async function fetchWeatherData(city) {
    const apiURl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
      const response = await fetch(apiURl);
      const data = await response.json();
      if (data.cod === 200) {
        displayWeather(data);
      } else {
        alert('City not found,Please try again');
      }
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  }

  function displayWeather(data) {
    cityName.textContent = data.name;
    temperature.textContent = `${data.main.temp}°C`;
    description.textContent = data.weather[0].description;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.body.style.backgroundImage = `url('https://source.unsplash.com/featured/1600x900/?${data.name}')`;
    humidity.innerHTML = `Humidity: <span>${data.main.humidity}%</span>`;
    realFeel.innerHTML = `Real Feel: <span>${data.main.feels_like}°C</span>`;
    windSpeed.innerHTML = `Wind Speed: <span>${data.wind.speed} m/s</span>`;
    pressure.innerHTML = `Pressure: <span>${data.main.pressure} hPa</span>`;

    weatherIcon.alt = data.weather[0].icon;
  }

  // fetchWeatherData(defaultCity);
});
