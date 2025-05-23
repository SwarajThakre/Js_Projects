document.addEventListener('DOMContentLoaded', function () {
  const apiKey = '026cb15c2bd44f5830ffe6f7353e8d7a';
  const cityInput = document.getElementById('city');
  const cityName = document.getElementById('cityName');
  const temperature = document.getElementById('temperature');
  const description = document.getElementById('description');
  const weatherIcon = document.getElementById('weatherIcon');
  const tempMin = document.getElementById('tempMin');
  const tempMax = document.getElementById('tempMax');
  const humidity = document.getElementById('humidity');
  const realFeel = document.getElementById('real-feel');
  const windSpeed = document.getElementById('wind-speed');
  const pressure = document.getElementById('pressure');
  const sidebarWeatherIcon = document.getElementById('sidebarWeatherIcon');
  const sidebarTemp = document.getElementById('sidebarTemp');

  // Set default background
  document.body.style.background =
    'linear-gradient(135deg, var(--darker), var(--dark))';

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getCityName(latitude, longitude);
      },
      (error) => {
        console.error('Geolocation error:', error);
        fetchWeatherData('Mumbai');
      }
    );
  } else {
    fetchWeatherData('Mumbai');
  }

  cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const city = cityInput.value.trim();
      if (city) {
        fetchWeatherData(city);
      }
    }
  });

  document.querySelector('.search-btn').addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
      fetchWeatherData(city);
    }
  });

  async function getCityName(lat, lon) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
      );
      const data = await response.json();
      if (data.length > 0) {
        fetchWeatherData(data[0].name);
      }
    } catch (error) {
      console.error('Error getting city name:', error);
      fetchWeatherData('Mumbai');
    }
  }

  async function fetchWeatherData(city) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        displayWeather(data);
        updateSidebarWeather(data);
      } else {
        showError('City not found. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      showError('Failed to fetch weather data. Please try again.');
    }
  }

  function displayWeather(data) {
    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°`;
    description.textContent = data.weather[0].description;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    weatherIcon.alt = data.weather[0].description;

    tempMin.textContent = `${Math.round(data.main.temp_min)}°`;
    tempMax.textContent = `${Math.round(data.main.temp_max)}°`;
    realFeel.textContent = `${Math.round(data.main.feels_like)}°`;
    windSpeed.textContent = `${data.wind.speed} m/s`;
    humidity.textContent = `${data.main.humidity}%`;
    pressure.textContent = `${data.main.pressure} hPa`;

    updateBackground(data.weather[0].main);
  }

  function updateSidebarWeather(data) {
    sidebarWeatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    sidebarTemp.textContent = `${Math.round(data.main.temp)}°`;
  }

  function updateBackground(weatherCondition) {
    const gradientMap = {
      Clear: 'linear-gradient(135deg, #0575E6 0%, #00F260 100%)',
      Clouds: 'linear-gradient(135deg, #3a7bd5, #00d2ff)',
      Rain: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
      Thunderstorm: 'linear-gradient(135deg, #000428, #004e92)',
      Snow: 'linear-gradient(135deg, #e6dada, #274046)',
      Mist: 'linear-gradient(135deg, #606c88, #3f4c6b)',
      default: 'linear-gradient(135deg, var(--darker), var(--dark))',
    };

    document.body.style.background =
      gradientMap[weatherCondition] || gradientMap['default'];
  }

  function showError(message) {
    cityName.textContent = 'Error';
    description.textContent = message;
    temperature.textContent = '--°';
    weatherIcon.src = '';
  }
});
