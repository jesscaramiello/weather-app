'use client'
import { SetStateAction, useState } from "react";

export default function Home() {
  const apiKey ="23d1b161c263b4c89469372c6eedb5b0"
  const [city,setCity] = useState("");
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
  async function checkWeather(cityName: string) {
   try{
      const response = await fetch(apiUrl+cityName+`&appid=${apiKey}`);
      var data = await response.json();
      console.log(data);

      const cityElement = document.querySelector(".city");
      if (cityElement !== null) {
        cityElement.innerHTML = data.name;
      }

      const tempElement = document.querySelector(".temp");
      if (tempElement !== null) {
        tempElement.innerHTML = Math.round(data.main.temp) + "°c";
      }

      const humidityElement = document.querySelector(".humidity");
      if (humidityElement !== null) {
        humidityElement.innerHTML = data.main.humidity + "%";
      }

      const windElement = document.querySelector(".wind");
      if (windElement !== null) {
        windElement.innerHTML = data.wind.speed + "kph";
      }



    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
    
    
  }


  

  const handleSearch = () => {
    console.log(city);
    checkWeather(city);
  };
  //checkWeather("new york");
  return (
    <>
    
    <div>
     <label htmlFor="CityName">City:  </label>
      <input type="text" placeholder="City Name..." id="CityName" name="CityName" 
        value={city}
        onChange={e => setCity(e.target.value)}></input>

      <button onClick={handleSearch}>Search</button>

      <h1 className="temp">°c</h1>
      <h2 className="city">City</h2>
      <div className="details">
        <div className="col">
          <div>
            <p className="humidity">%</p>
            <p>Humidity</p>
          </div>
          <div>
            <p className="wind">kph</p>
            <p>Wind Speed</p>
          </div>
        </div>

      </div>

    </div>
    </>
  );
}
