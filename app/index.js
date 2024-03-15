import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Location from "expo-location";
import { StyleSheet, View, Text } from "react-native";
import WeatherDisplay from "./components/WeatherDisplay";
import SearchSection from "./components/SearchSection";
import Loader from "./components/Loader";
import Error from "./components/Error";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";
import WeatherForecast from "./components/WeatherForecast";

export default function App() {
  const apikey = process.env.EXPO_PUBLIC_APIKEY;
  const isFocused = useIsFocused();
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [cityname, setCityname] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    if (isFocused) {
      getLocationWeather();
      const interval = setInterval(() => {
        setCurrentTime(getCurrentTime());
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isFocused]);

  const getLocationWeather = async () => {
    setLoader(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMessage("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const responseWeather = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`
      );

      const responseForecast = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey}`
      );

      setWeatherData(responseWeather.data);
      setCityname(responseWeather.data.name);

      setForecastData(responseForecast.data);
      setErrorMessage(null);
      console.log("Weather data:", responseWeather.data);
      console.log("Weather Forecast data:", responseForecast.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setErrorMessage("Error fetching weather data. Please try again.");
    }
    setLoader(false);
  };

  const getWeatherbyCity = async () => {
    setLoader(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apikey}`
      );

      setWeatherData(response.data);
      setErrorMessage(null);
      console.log("Weather data:", response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setErrorMessage(`Unable to find city ${cityname}. Please try again.`);
    }
    setLoader(false);
  };

  const timezoneOffsetSeconds = weatherData?.timezone || 0; // If timezone is not available, default to 0

  // Create a new Date object and adjust it by the timezone offset
  const currentDate = new Date();
  const adjustedDate = new Date(
    currentDate.getTime() + timezoneOffsetSeconds * 1000
  );

  // Convert the adjusted date to a formatted string
  const formattedDate = adjustedDate.toLocaleString("en-US", {
    timeZone: "UTC", // Set the source timezone to UTC
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  function getCurrentTime() {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // 12-hour clock format
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#09AFAF", "#8577E0"]}
        style={styles.background}
      />

      <SearchSection
        cityname={cityname}
        setCityname={setCityname}
        getWeatherbyCity={getWeatherbyCity}
        getLocationWeather={getLocationWeather}
      />
      <View style={styles.weatherInfo}>
        <Text style={styles.date}>
          {formattedDate} | {currentTime}
        </Text>

        {loader ? (
          <Loader loader={loader} errorMessage={errorMessage} />
        ) : errorMessage ? (
          <Error errorMessage={errorMessage} />
        ) : weatherData ? (
          <WeatherDisplay weatherData={weatherData} />
        ) : null}
      </View>
      <WeatherForecast forecastData={forecastData} />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 1000,
  },
  container: {
    backgroundColor: "#000",
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },

  error: {
    color: "red",
    marginTop: 10,
  },

  weatherInfo: {
    padding: 20,
  },

  date: {
    color: "#fff",
    marginTop: 10,
  },
});
