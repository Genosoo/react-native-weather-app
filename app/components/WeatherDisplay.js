import { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_500Medium,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { useIsFocused } from "@react-navigation/native";

const WeatherDisplay = ({ weatherData }) => {
  const [sunriseTime, setSunriseTime] = useState(null);
  const [sunsetTime, setSunsetTime] = useState(null);
  const isFocused = useIsFocused();

  const [fontsLoaded, fontError] = useFonts({
    Poppins_600SemiBold,
    Poppins_500Medium,
    Poppins_400Regular,
  });

  useEffect(() => {
    if (isFocused && weatherData && weatherData.sys) {
      setSunriseTime(convertUnixToTime(weatherData.sys.sunrise));
      setSunsetTime(convertUnixToTime(weatherData.sys.sunset));
    }
  }, [weatherData, isFocused]);

  const convertUnixToTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // 12-hour clock format
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
  };

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  const visibilityMeters = weatherData?.visibility || null;
  // Convert visibility from meters to kilometers
  const visibilityKilometers =
    visibilityMeters !== null ? visibilityMeters / 1000 : null;

  let weatherImageSource;
  if (weatherData?.weather?.[0]?.main === "Clouds") {
    weatherImageSource = require("../../assets/weatherIcon/cloudy.png");
  } else if (weatherData?.weather?.[0]?.main === "Clear") {
    weatherImageSource = require("../../assets/weatherIcon/sun.png");
  } else if (weatherData?.weather?.[0]?.main === "Rain") {
    weatherImageSource = require("../../assets/weatherIcon/rain.png");
  } else if (weatherData?.weather?.[0]?.main === "Thunderstorm") {
    weatherImageSource = require("../../assets/weatherIcon/thunder.png");
  } else {
    weatherImageSource = require("../../assets/weatherIcon/sun.png");
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text1}>
          {weatherData?.name || "Not Found"}, {weatherData.sys.country}
        </Text>

        <Text style={styles.text2}>
          {weatherData?.main
            ? kelvinToCelsius(weatherData.main.temp).toFixed(0)
            : "Not Found"}{" "}
          °C
        </Text>

        <View style={styles.textBox}>
          <Text style={styles.text3}>
            Feels Like:{" "}
            {weatherData?.main
              ? kelvinToCelsius(weatherData.main.feels_like).toFixed(0)
              : "Not Found"}{" "}
            °C
          </Text>

          <Text style={styles.text3}>
            Humidity: {weatherData?.main.humidity || "Not found"} %
          </Text>
          <Text style={styles.text3}>
            Visibility: {visibilityKilometers.toFixed(1)} km
          </Text>
        </View>
      </View>

      <View style={styles.box2}>
        <Image
          source={weatherImageSource}
          style={{ width: 170, height: 150 }}
        />

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.text4}>
            {weatherData?.weather?.[0]?.main || "Not Found"}
          </Text>
        </View>

        <View style={styles.box3Container}>
          <View style={styles.box3Wrapper}>
            <View style={styles.box3}>
              <Image
                source={require("../../assets/weatherIcon/sunrise.png")}
                style={{ width: 20, height: 20 }}
              />
              <Text style={styles.box3Text}>Sunrise</Text>
            </View>
            <Text style={styles.box3Text2}>{sunriseTime}</Text>
          </View>

          <View style={styles.box3Wrapper}>
            <View style={styles.box3}>
              <Image
                source={require("../../assets/weatherIcon/sunset.png")}
                style={{ width: 20, height: 20 }}
              />
              <Text style={styles.box3Text}>Sunset</Text>
            </View>
            <Text style={styles.box3Text2}>{sunsetTime}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WeatherDisplay;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
  },

  box2: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    alignItems: "center",
    marginTop: 20,
  },

  box3Container: {
    display: "flex",
    flexDirection: "row",
    gap: 40,
    marginTop: 20,
    marginRight: 20,
  },
  box3Wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  box3: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  box3Text: {
    fontFamily: "Poppins_400Regular",
    color: "#fff",
    fontSize: 15,
  },
  box3Text2: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
  },
  text1: {
    fontSize: 25,
    color: "#fff",
    marginTop: 10,
    fontFamily: "Poppins_600SemiBold",
  },

  text2: {
    fontSize: 60,
    color: "#fff",
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "#107676",
    textShadowOffset: { width: -1, height: 3 },
    textShadowRadius: 8,
  },

  textBox: {
    marginTop: 20,
  },

  text3: {
    fontSize: 18,
    color: "#fff",
    marginTop: 5,
    fontFamily: "Poppins_400Regular",
  },

  text4: {
    fontSize: 30,
    color: "#fff",
    textTransform: "capitalize",
    fontFamily: "Poppins_500Medium",
  },
});
