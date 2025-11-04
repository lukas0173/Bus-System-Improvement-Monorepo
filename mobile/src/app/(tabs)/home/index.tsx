import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Mapbox from "@rnmapbox/maps";
import { List, Shuffle, Pause, Bus } from "lucide-react-native";
import HeaderHome from "@components/home/Header.Home";
import { Colors } from "@constants/theme";
import SearchBarHome from "@/src/components/home/SearchBar.Home";
import ActionButtonHome from "@components/home/ActionButton.Home";

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

// Mapbox configuration
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN!);

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        ...styles.container,
        marginTop: insets.top,
        marginBottom: insets.bottom,
      }}
    >
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <HeaderHome />
        <SearchBarHome />
        <ActionButtons />
        <Mapbox.MapView style={styles.map} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary[950],
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchContainer: {
    marginVertical: 10,
  },
  searchLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.secondary[500],
    marginBottom: 8,
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    height: 50,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  map: {
    flex: 1,
    borderRadius: 15,
    overflow: "hidden",
  },
});
