import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { List, Shuffle, Pause, Bus } from "lucide-react-native";
import HeaderHome from "@components/home/Header.Home";
import { Colors, Spacing } from "@constants/theme";
import SearchBarHome from "@/src/components/home/SearchBar.Home";
import ActionButtonHome from "@components/home/ActionButton.Home";
import MapHome from "@components/home/Map.Home";

const ActionButtons = () => (
  <View style={styles.actionsContainer}>
    <ActionButtonHome icon={<List color="white" size={28} />} label="Tra cứu" />
    <ActionButtonHome
      icon={<Shuffle color="white" size={28} />}
      label="Tuyến đường"
    />
    <ActionButtonHome icon={<Pause color="white" size={28} />} label="Trạm" />
    <ActionButtonHome icon={<Bus color="white" size={28} />} label="Xe buýt" />
  </View>
);

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <HeaderHome />
        <SearchBarHome />
        <ActionButtons />
        <MapHome />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary[950],
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: Spacing.md,
  },
});
