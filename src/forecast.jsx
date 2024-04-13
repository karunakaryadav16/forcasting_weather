// import { useEffect, useState } from "react";
// import axios from "axios";

// const ForecastWeather = () => {
//   const [forecastData, setForecastData] = useState([]);
//   const city = "London"; 
// const apiKey = "bf89bc2cde67abeceea98d4c23a10716"
//   useEffect(() => {
//     const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=bf89bc2cde67abeceea98d4c23a10716`;

//     const fetchForecastData = async () => {
//       try {
//         const response = await axios.get(apiUrl);
//         setForecastData(response.data.list);
//         console.log(response.data.list)
//         console.log(forecastData)
      

//       } catch (error) {
//         console.error("Error fetching forecast data:", error.message);
//       }
//     };

//     fetchForecastData();
//   }, [city]);

//   if (!forecastData) {
//     return <div>Loading...</div>;
//   }

//   // Process forecastData and render the forecast weather information

//   return (

//     <div>
//             <input type="search" placeholder="enter place name here"  onChange={(e)=>{setinputvalue(e.target.value)}}/>

//       {/* Render forecast weather information here */}

//       <div>
//         {
//             forecastData.map((s)=>{
//                 return <p>{s.dt}</p>
//             })
//         }
         
//         </div>





//     </div>
//   );
// };

// export default ForecastWeather;




















import { useEffect, useState } from "react";
import axios from "axios";

const ForecastWeather = () => {
  const [forecastData, setForecastData] = useState(null);
  const city = "London"; // Example city name

  useEffect(() => {
    const apiKey = "bf89bc2cde67abeceea98d4c23a10716";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    const fetchForecastData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setForecastData(response.data);
      } catch (error) {
        console.error("Error fetching forecast data:", error.message);
      }
    };

    fetchForecastData();
  }, [city]);

//   const parseForecastData = () => {
//     if (!forecastData) return [];
//     const dailyForecast = {};
//     forecastData.list.forEach(item => {
//       const date = item.dt_txt.split(" ")[0]; // Extract date from datetime string
//       if (!dailyForecast[date]) {
//         dailyForecast[date] = {
//           date,
//           weather: item.weather[0].description,
//           temperature: item.main.temp,
//           humidity: item.main.humidity,
//           windSpeed: item.wind.speed
//         };
//       }
//     });
//     return Object.values(dailyForecast);
//   };

const parseForecastData = () => {
    if (!forecastData) return [];
    
    const uniqueDates = new Set();
    const dailyForecast = [];
  
    forecastData.list.forEach(item => {
      const date = item.dt_txt.split(" ")[0]; // Extract date from datetime string
      
      // Check if the date is unique, then add it to the set and dailyForecast
      if (!uniqueDates.has(date)) {
        uniqueDates.add(date);
        dailyForecast.push({
          date,
          weather: item.weather[0].description,
          temperature: item.main.temp,
          humidity: item.main.humidity,
          windSpeed: item.wind.speed
        });
      }
    });
  
    return dailyForecast;
  };





  const dailyForecast = parseForecastData();

  return (
    <div>
      <h2>5-Day Forecast</h2>
      {dailyForecast.map(day => (
        <div key={day.date}>
          <h3>{day.date}</h3>
          <p>Weather: {day.weather}</p>
          <p>Temperature: {day.temperature}</p>
          <p>Humidity: {day.humidity}</p>
          <p>Wind Speed: {day.windSpeed}</p>
        </div>
      ))}
    </div>
  );
};

export default ForecastWeather;




















