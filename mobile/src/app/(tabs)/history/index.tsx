import React, { useState } from "react";
import { View, StyleSheet, FlatList, RefreshControl, Text } from "react-native";

import { Spacing, Colors } from "@constants/theme";
import HeaderHistory from "@components/history/Header.History";
import TabHistory from "@components/history/Tab.History";
import ItemHistory from "@/src/components/history/Item.History";
import { useTripHistories } from "@/src/context/TripHistoryContext";

type ActiveTab = "Tất cả" | "Hoàn thành" | "Đã hủy";

const HistoryScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState<ActiveTab>("Tất cả");
  const { tripHistories, isLoading, error, refetch } = useTripHistories();

  const filteredHistory = tripHistories.filter((item) => {
    // Filter by active tab
    if (activeTab === "Hoàn thành" && item.status !== "Hoàn thành")
      return false;
    if (activeTab === "Đã hủy" && item.status !== "Đã hủy") return false;

    // Filter by search text (checks title, route, and date)
    const searchLower = searchText.toLowerCase();
    if (
      searchText &&
      !item.route.toLowerCase().includes(searchLower) &&
      !item.start.toLowerCase().includes(searchLower) &&
      !item.bus.toLowerCase().includes(searchLower)
    ) {
      return false;
    }

    // Passed all filters
    return true;
  });

  if (error) {
    return (
      <Text style={{ color: "white", textAlign: "center", marginTop: 20 }}>
        Error fetching data: {error.message}
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderHistory searchText={searchText} setSearchText={setSearchText} />

      {/* --- Tabs Section --- */}
      <View style={styles.tabsContainer}>
        <TabHistory
          label="Tất cả"
          isActive={activeTab === "Tất cả"}
          onPress={() => setActiveTab("Tất cả")}
        />
        <TabHistory
          label="Hoàn thành"
          isActive={activeTab === "Hoàn thành"}
          onPress={() => setActiveTab("Hoàn thành")}
        />
        <TabHistory
          label="Đã hủy"
          isActive={activeTab === "Đã hủy"}
          onPress={() => setActiveTab("Đã hủy")}
        />
      </View>

      {/* History list */}
      <FlatList
        data={filteredHistory}
        renderItem={({ item }) => <ItemHistory item={item} />}
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

export default HistoryScreen;

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
