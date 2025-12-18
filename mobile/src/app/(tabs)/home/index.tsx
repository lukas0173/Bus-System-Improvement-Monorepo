import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { List, Shuffle, Pause, Bus } from "lucide-react-native";
import { useRouter } from "expo-router";
import HeaderHome from "@components/home/Header.Home";
import { Colors, Spacing } from "@constants/theme";
import SearchBarHome from "@/src/components/home/SearchBar.Home";
import ActionButtonHome from "@components/home/ActionButton.Home";
import MapHome from "@components/home/Map.Home";
import { updateNotificationLed } from "@/src/api/pocketbase.update";
import { useSelection } from "@/src/context/SelectionContext";
import SelectionCard from "@/src/components/home/SelectionCard";

const ActionButtons = () => {
  const router = useRouter();
  return (
    <View style={styles.actionsContainer}>
      <ActionButtonHome
        icon={<Shuffle color="white" size={28} />}
        label="Tuyến"
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
      <ActionButtonHome
        icon={<List color="white" size={28} />}
        label="Hỗ trợ"
        navigation={() =>
          updateNotificationLed("4mmd7x25iuo3z3s", { logic: false })
        }
      />
    </View>
  );
};

const HomeScreen = () => {
  const { selectedItems } = useSelection();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <HeaderHome />
        
        {/* Selected Items List - Limited Height */}
        {selectedItems.length > 0 && (
          <View style={styles.selectionListContainer}>
            <ScrollView 
              style={styles.selectionList}
              showsVerticalScrollIndicator={false}
            >
              {selectedItems.map((item) => (
                <SelectionCard key={item.id} item={item} />
              ))}
            </ScrollView>
          </View>
        )}

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
  selectionListContainer: {
    maxHeight: 150, // Limit height to show map still
    marginBottom: Spacing.sm,
  },
  selectionList: {
    flexGrow: 0,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: Spacing.md,
  },
});
