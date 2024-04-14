import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {Parentcontainer} from "./styledcomponent.jsx"
import { Navbar,  Forecastcontainer , ForecastchildContainer,Heading , Weatherinformation,Image, Heading1,Input, Overallcontainer, Buttonelemnt, Imagecontainer, Spinner  } from './styledcomponent.jsx'
import { v4 as uuidv4 } from 'uuid';
import thumbnail from "./assets/thunder.svg"
import moon from "./assets/moon.svg"
import snowcloud from "./assets/snow.svg"
import overcastclouds from "./assets/cloudy.svg"
import { DNA} from "react-loader-spinner"
import {  useDispatch } from 'react-redux'
import { addtostore } from './store.jsx';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [ForecastResponse , setForecastResponse] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState('');
  let id = useParams();
  const dispatch= useDispatch()


  useEffect(() => {

    
    const apiKey = "bf89bc2cde67abeceea98d4c23a10716";
    const fetchWeatherData = async () => {
      try {
       
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${id.id}&appid=${apiKey}`);
        const forecastingdata = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${id.id}&appid=${apiKey}`);
        console.log(`i am response data in weather ${response.data}`);

        dispatch(addtostore(forecastingdata.data.city.name));
        setWeatherData(response.data);
        setForecastResponse(forecastingdata.data);
        console.log("i am useeffect",forecastingdata.data);
        console.log(" i am useeffect called  1")
        setError('');
      } catch(error) {
        setError(`Error fetching weather data: ${error.message}`);
      }
    };

    if (id.id) {
      fetchWeatherData();


    }
  }, [id.id]);





  const temp = 273.15; 
  
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=bf89bc2cde67abeceea98d4c23a10716`);
      const forecastingdata = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=bf89bc2cde67abeceea98d4c23a10716`);
      
      setWeatherData(response.data);
      setForecastResponse(forecastingdata.data);
      setError('');
    } catch (error) {
      alert("city not found")

      
      setError(`Error fetching weather data: ${error.message}`);
    }
  };

  const parseForecastData = (forecastData) => {
    if (!forecastData || !forecastData.list) return [];
    
    const uniqueDates = new Set();
    const dailyForecast = [];

    forecastData.list.forEach(item => {
      const date = item.dt_txt.split(" ")[0];
      
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

  const dailyForecast = parseForecastData(ForecastResponse);

  const forecastimages = [
    
    {
       id :  uuidv4(),
       imageUrl:overcastclouds,
       category: "overcast clouds"
       } ,
       {
       id :  uuidv4(),
       imageUrl: snowcloud,
       category: "light snow"
       } ,
        {
       id :  uuidv4(),
       imageUrl: "https://assets.ccbp.in/frontend/intermediate-rwd/rain-with-sun-img.png",
       category: "light rain"
       } ,
        {
       id :  uuidv4(),
       imageUrl: "https://assets.ccbp.in/frontend/intermediate-rwd/sunny-img.png ",
       category: "clear sky"
       } ,


       {
       id :  uuidv4(),
       imageUrl: "https://assets.ccbp.in/frontend/intermediate-rwd/partly-cloudy-img.png ",
       category: "broken clouds"
       }, {
       id :  uuidv4(),
       imageUrl:thumbnail,
       category: "scattered clouds"
       } ,

       {
       id :  uuidv4(),
       imageUrl: "https://assets.ccbp.in/frontend/intermediate-rwd/partly-cloudy-img.png ",
       category: "few clouds"
       }

       ,{
        id:uuidv4(),
        imageUrl:moon,
        category:"moderate rain"
       }

  ]



const isMobile = window.innerWidth < 788;


  return (
    <Parentcontainer>  
       <Navbar> 
          <Heading1> Weather App</Heading1> 
              <form onSubmit={handleSearch}>
                <Input
                  type="text"
                  placeholder="Enter Location"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <Buttonelemnt type="submit">Search</Buttonelemnt>
              </form>
        </Navbar>  
      
      {ForecastResponse === null && weatherData === null? <Spinner>  <DNA
            visible={true}
            height={isMobile ? "500px" : "900px"}
            width={isMobile ? "500px" : "900px"}
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
            />  </Spinner>:
       
           
        <Overallcontainer>


              {weatherData && (
                <Weatherinformation  key={weatherData.id}>
                  <Imagecontainer> 
                  <h2>Weather Information</h2>
                  <img src="https://assets.ccbp.in/frontend/intermediate-rwd/partly-sunny-img.png "/>
                  </Imagecontainer>
                  <Imagecontainer>
                  <h1 style={{color:"red", fontSize:"25px"}}>Location: {weatherData.name}, {weatherData.sys.country}</h1>
                  <p>Temperature: {`${Math.round(weatherData.main.temp - temp)}`}°C</p>

                  <p>Weather: {weatherData.weather[0].description}</p>
                  <p>Humidity: {weatherData.main.humidity}%</p>
                  <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                  </Imagecontainer>
                </Weatherinformation>
              )}

<Forecastcontainer>
  <Heading>5-Day Forecast</Heading>
  {dailyForecast.map(day => (
    <ForecastchildContainer key={day.date}>
      <h3>{day.date}</h3>
      <p style={{color: 'orange', fontWeight: '800'}}>
          {`(
          ${new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(
            new Date(day.date),
          )}
          )`}
        </p>
      <p>Weather: {day.weather}</p>
      <p>Temperature:( {Math.round(day.temperature- temp)} )<sup>o</sup>C</p>
     <p>Kelvin: ({Math.round(day.temperature)} <sup>o</sup>K)</p>
     <p>Fahrenheit: ({Math.round((day.temperature - temp) * 9/5 + 32)}<sup>o</sup>F)</p>
    <p>Humidity: {day.humidity}</p>
    <p>Wind Speed: {day.windSpeed}</p>
      {forecastimages.map(image => {
        if (day.weather === image.category) {
          return <Image key={image.id} src={image.imageUrl} alt={image.category} />;
        }
        return null;
      })}
    </ForecastchildContainer>
  ))}
</Forecastcontainer>


     </Overallcontainer>
     }
</Parentcontainer>
  );
};

export default WeatherApp;

















