import React from "react";
import { View, StyleSheet } from "react-native";
import { List, Shuffle, Pause, Bus } from "lucide-react-native";
import { useRouter } from "expo-router";
import HeaderHome from "@components/home/Header.Home";
import { Colors, Spacing } from "@constants/theme";
import SearchBarHome from "@/src/components/home/SearchBar.Home";
import ActionButtonHome from "@components/home/ActionButton.Home";
import MapHome from "@components/home/Map.Home";
import { updateNotificationLed } from "@/src/api/pocketbase.update";

const ActionButtons = () => {
  const router = useRouter();
  return (
    <View style={styles.actionsContainer}>
      <ActionButtonHome
        icon={<List color="white" size={28} />}
        label="Tra cứu"
        navigation={() =>
          updateNotificationLed("4mmd7x25iuo3z3s", { logic: false })
        }
      />
      <ActionButtonHome
        icon={<Shuffle color="white" size={28} />}
        label="Tuyến đường"
        navigation={() => router.navigate("/home/route/Route.Home.Screen")}
      />
      <ActionButtonHome
        icon={<Pause color="white" size={28} />}
        label="Trạm"
        navigation={() => router.navigate("/home/station/Station.Home.Screen")}
      />
      <ActionButtonHome
        icon={<Bus color="white" size={28} />}
        label="Xe buýt"
        navigation={() => router.navigate("/home/bus/Bus.Home.Screen")}
      />
    </View>
  );
};

const HomeScreen = () => {
  return (
    <View style={styles.container}>
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
    marginBottom: Spacing.md,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: Spacing.md,
  },
});
