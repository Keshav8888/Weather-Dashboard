import { useState } from "react";

function SearchBar({ fetchWeather }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
    setCity("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;


// import { useState, useEffect } from "react";

// function SearchBar({ fetchWeather }) {
//   const [city, setCity] = useState("");
//   const [debouncedCity, setDebouncedCity] = useState("");

//   // ⏳ Debounce logic
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedCity(city);
//     }, 500); // 500ms delay

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [city]);

//   // 🔥 Call API when debounced value changes
//   useEffect(() => {
//     if (debouncedCity) {
//       fetchWeather(debouncedCity);
//     }
//   }, [debouncedCity]);

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search city..."
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//       />
//     </div>
//   );
// }

// export default SearchBar;