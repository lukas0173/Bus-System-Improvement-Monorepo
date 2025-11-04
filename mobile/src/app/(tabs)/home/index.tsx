import React from "react";
import { View, StyleSheet } from "react-native";
import SearchBar from "./Search.Home";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <SearchBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
  },
});
