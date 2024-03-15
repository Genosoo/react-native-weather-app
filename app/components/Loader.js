import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";

const Loader = ({ loader, errorMessage }) => {
  return (
    <View>
      {loader ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : errorMessage ? (
        <Text style={styles.error}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

export default Loader;
