'use client'
import {  useState } from "react";

import { Container, TextField, Button, Grid } from "@material-ui/core";
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
    <Container maxWidth="md">
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <Grid container spacing={3} alignItems="center" justify="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="City Name..."
              id="CityName"
              name="CityName"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <h1 className="temp">°c</h1>
          </Grid>
          <Grid item xs={12} md={6}>
            <h2 className="city">City</h2>
          </Grid>
          <Grid item xs={12} md={6}>
            <div>
              <p className="humidity">%</p>
              <p>Humidity</p>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div>
              <p className="wind">kph</p>
              <p>Wind Speed</p>
            </div>
          </Grid>
        </Grid>
    </div>
    </Container>
    </>
  );
}
