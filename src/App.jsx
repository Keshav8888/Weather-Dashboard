import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      setError("");

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
      );

      if (!weatherRes.ok) {
        throw new Error("City not found");
      }

      const weatherData = await weatherRes.json();
      setWeather(weatherData);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`,
      );

      const forecastData = await forecastRes.json();
      setForecast(forecastData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Save theme preference
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Auto detect location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`,
      );

      const data = await res.json();
      setWeather(data);
    });
  }, []);

  let backgroundClass = "default-bg";

  if (weather && weather.main) {
    const temp = weather.main.temp;

    if (temp < 15) {
      backgroundClass = "cold-bg";
    } else if (temp >= 15 && temp <= 30) {
      backgroundClass = "normal-bg";
    } else {
      backgroundClass = "hot-bg";
    }
  }

  return (
    // <div className="container">
    <div className={`container ${backgroundClass}`}>
      <h1>Weather Dashboard</h1>

      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      <SearchBar fetchWeather={fetchWeather} />

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weather && <WeatherCard weather={weather} />}
      {forecast && <Forecast forecast={forecast} />}
    </div>
  );
}

export default App;
