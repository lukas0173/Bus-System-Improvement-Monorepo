import React from "react";
import { View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.primary[950]}
      />
      <View style={styles.content}>
        <HeaderHome />
        <SearchBarHome />
        <ActionButtons />
        {/*<MapView
          style={styles.map}
          initialRegion={{
            latitude: 16.0544, // Da Nang Latitude
            longitude: 108.2022, // Da Nang Longitude
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />*/}
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
