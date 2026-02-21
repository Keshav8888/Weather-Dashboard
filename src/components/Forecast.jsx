function Forecast({ forecast }) {
  if (!forecast || !forecast.list) return null;

  const dailyData = forecast.list.filter(item =>
    item.dt_txt.includes("12:00:00")
  );

  return (
    <div className="forecast">
      <h3 className="forecast-heading">5 Day Forecast</h3>

      <div className="forecast-container">
        {dailyData.map((item, index) => {
          const iconCode = item.weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

          return (
            <div key={index} className="forecast-card">
              <p className="forecast-date">
                {item.dt_txt.split(" ")[0]}
              </p>

              <img src={iconUrl} alt="icon" />

              <p className="forecast-temp">
                {item.main.temp} °C
              </p>

              <p className="forecast-condition">
                {item.weather[0].main}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;