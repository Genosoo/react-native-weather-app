import { StyleSheet, View, Text } from "react-native";

const Error = ({ errorMessage }) => {
  return (
    <View>
      <Text style={styles.error}>{errorMessage}</Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  error: {
    color: "red",
    marginTop: 10,
  },
});
