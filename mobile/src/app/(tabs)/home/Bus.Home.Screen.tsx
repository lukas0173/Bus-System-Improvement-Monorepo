import React, { useState } from "react";
import { View, StyleSheet, FlatList, RefreshControl } from "react-native";

import { Spacing, Colors } from "@constants/theme";
import { Bus } from "@/src/types/bus";
import HeaderBusHome from "@components/home/bus/Header.Bus.Home";
import TabBusHome from "@components/home/bus/Tab.Bus.Home";
import ItemBusHome from "@components/home/bus/Item.Bus.Home";
import { useBuses } from "@/src/context/BusContext";

type ActiveTab = "Tất cả" | "Hoạt động" | "Tạm dừng";

const BusHomeScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState<ActiveTab>("Tất cả");

  const { buses, isLoading, error, refetch } = useBuses();

  const filteredHistory = buses.filter((item) => {
    // Filter by active tab
    if (activeTab === "Hoạt động" && item.status !== "Hoạt động") return false;
    if (activeTab === "Tạm dừng" && item.status !== "Tạm dừng") return false;

    // Filter by search text (checks title, route, and date)
    const searchLower = searchText.toLowerCase();
    if (
      searchText &&
      !item.title.toLowerCase().includes(searchLower) &&
      !item.date.toLowerCase().includes(searchLower)
    ) {
      return false;
    }

    // Passed all filters
    return true;
  });

  return (
    <View style={styles.container}>
      <HeaderBusHome searchText={searchText} setSearchText={setSearchText} />

      {/* --- Tabs Section --- */}
      <View style={styles.tabsContainer}>
        <TabBusHome
          label="Tất cả"
          isActive={activeTab === "Tất cả"}
          onPress={() => setActiveTab("Tất cả")}
        />
        <TabBusHome
          label="Hoạt động"
          isActive={activeTab === "Hoạt động"}
          onPress={() => setActiveTab("Hoạt động")}
        />
        <TabBusHome
          label="Tạm dừng"
          isActive={activeTab === "Tạm dừng"}
          onPress={() => setActiveTab("Tạm dừng")}
        />
      </View>

      {/* History list */}
      <FlatList
        data={filteredHistory}
        renderItem={({ item }) => <ItemBusHome item={item} />}
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

export default BusHomeScreen;

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
