function WeatherCard({ weather }) {
  if (!weather || !weather.main) return null;

  const temp = weather.main.temp;
  
  // Max temp scale (0°C – 50°C)
  const maxTemp = 50;

  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  const percentage = Math.min(temp / maxTemp, 1);
  const strokeDashoffset = circumference - percentage * circumference;

  const iconCode = weather.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="card">
      <h2>{weather.name}</h2>

      <img src={iconUrl} alt="weather icon" />

      {/* 🌡 Circular Temperature Meter */}
      <div className="circle-container">
        <svg width="180" height="180">
          <circle
            stroke="#eee"
            fill="transparent"
            strokeWidth="12"
            r={radius}
            cx="90"
            cy="90"
          />

          <circle
            stroke="url(#gradient)"
            fill="transparent"
            strokeWidth="12"
            r={radius}
            cx="90"
            cy="90"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />

          <defs>
            <linearGradient id="gradient">
              <stop offset="0%" stopColor="#00c6ff" />
              <stop offset="100%" stopColor="#ff512f" />
            </linearGradient>
          </defs>
        </svg>

        <div className="temp-text">{temp}°C</div>
      </div>

      <p>🌥 {weather.weather[0].description}</p>
      <p>💧 Humidity: {weather.main.humidity}%</p>
      <p>💨 Wind: {weather.wind.speed} m/s</p>
    </div>
  );
}

export default WeatherCard;
