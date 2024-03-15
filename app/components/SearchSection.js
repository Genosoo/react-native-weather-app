import React from "react";
import { StyleSheet, View, TextInput, Pressable, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
const SearchSection = ({
  cityname,
  setCityname,
  getWeatherbyCity,
  getLocationWeather,
}) => {
  return (
    <View style={styles.searchContainer}>
      <Pressable style={styles.currentLocation} onPress={getLocationWeather}>
        <Ionicons name="location-outline" size={30} color="#fff" />
      </Pressable>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          value={cityname}
          onChangeText={(text) => setCityname(text)}
          placeholder="Enter city name"
          placeholderTextColor={"#fff"}
        />
        <Pressable style={styles.button} onPress={getWeatherbyCity}>
          <AntDesign name="search1" style={styles.icon} />
        </Pressable>
      </View>
    </View>
  );
};

export default SearchSection;

const styles = StyleSheet.create({
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    position: "relative",
    width: "100%",
    marginTop: 20,
  },
  searchBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "70%",
  },
  button: {
    backgroundColor: "#FFFFFF",
    width: 40,
    height: 40,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 5,
  },
  icon: {
    fontSize: 20,
    color: "#2F208D",
  },
  input: {
    backgroundColor: "#107676",
    borderRadius: 30,
    padding: 10,
    width: "100%",
    color: "#fff",
    fontSize: 20,
    paddingLeft: 23,
  },
  currentLocation: {
    backgroundColor: "#085A5A",
    height: 50,
    width: 50,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textShadowColor: "#107676",
    textShadowOffset: { width: -1, height: 3 },
    textShadowRadius: 8,
  },
});
