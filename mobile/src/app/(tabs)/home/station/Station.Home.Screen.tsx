import React, { useState } from "react";
import { View, StyleSheet, FlatList, RefreshControl } from "react-native";

import { Spacing, Colors } from "@constants/theme";
import HeaderStationHome from "@components/home/station/Header.Station.Home";
import TabStationHome from "@components/home/station/Tab.Station.Home";
import ItemStationHome from "@components/home/station/Item.Station.Home";
import { useStations } from "@/src/context/StationContext";

type ActiveTab = "Tất cả" | "Hoạt động" | "Tạm dừng";

const StationHomeScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState<ActiveTab>("Tất cả");

  const { stations, isLoading, refetch } = useStations();

  const filteredStations = stations.filter((item) => {
    // Filter by active tab
    if (activeTab === "Hoạt động" && item.status !== "active") return false;
    if (activeTab === "Tạm dừng" && item.status !== "stopped") return false;

    // Filter by search text (checks name and address)
    const searchLower = searchText.toLowerCase();
    if (
      searchText &&
      !item.name.toLowerCase().includes(searchLower) &&
      !item.address.toLowerCase().includes(searchLower)
    ) {
      return false;
    }

    // Passed all filters
    return true;
  });

  return (
    <View style={styles.container}>
      <HeaderStationHome searchText={searchText} setSearchText={setSearchText} />

      {/* --- Tabs Section --- */}
      <View style={styles.tabsContainer}>
        <TabStationHome
          label="Tất cả"
          isActive={activeTab === "Tất cả"}
          onPress={() => setActiveTab("Tất cả")}
        />
        <TabStationHome
          label="Hoạt động"
          isActive={activeTab === "Hoạt động"}
          onPress={() => setActiveTab("Hoạt động")}
        />
        <TabStationHome
          label="Tạm dừng"
          isActive={activeTab === "Tạm dừng"}
          onPress={() => setActiveTab("Tạm dừng")}
        />
      </View>

      {/* Station list */}
      <FlatList
        data={filteredStations}
        renderItem={({ item }) => <ItemStationHome item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            tintColor={Colors.info[50]}
            colors={[Colors.info[50]]}
          />
        }
      />
    </View>
  );
};

export default StationHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary[950],
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary[500],
  },
  listContent: {
    paddingBottom: Spacing.md,
    marginHorizontal: Spacing.md,
  },
});
