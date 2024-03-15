import { StyleSheet, View, Text, FlatList, SafeAreaView } from "react-native";
const Item = ({ city }) => (
  <View
    style={{
      display: "flex",
      flexDirection: "row",
      gap: 10,
    }}
  >
    <Text>{city.name}</Text>
  </View>
);

export default function WeatherForecast({ forecastData }) {
  return (
    <SafeAreaView>
      <FlatList
        data={forecastData}
        renderItem={({ item }) => <Item city={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
