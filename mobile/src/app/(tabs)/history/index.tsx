import React, { useState } from "react";
import { View, StyleSheet, FlatList, StatusBar } from "react-native";

import { HistoryItem } from "@/src/types/history";
import HeaderHistory from "@components/history/Header.History";
import TabHistory from "@components/history/Tab.History";
import ItemHistory from "@/src/components/history/Item.History";

// --- Mock Data ---
const MOCK_HISTORY: HistoryItem[] = [
  {
    id: "1",
    title: "Tuyến 06",
    date: "29/05/2025",
    route: "Trạm 05 Ông Ích Khiêm - Trạm 07 Trưng Nữ Vương",
    status: "Hoàn thành",
  },
  {
    id: "2",
    title: "Tuyến 12",
    date: "28/05/2025",
    route: "Trạm 01 Hùng Vương - Trạm 10 Cầu Rồng",
    status: "Hoàn thành",
  },
  {
    id: "3",
    title: "Tuyến 03",
    date: "27/05/2025",
    route: "Trạm 02 Phan Châu Trinh - Trạm 08 Ngũ Hành Sơn",
    status: "Đã hủy",
  },
  {
    id: "4",
    title: "Tuyến 06",
    date: "26/05/2025",
    route: "Trạm 05 Ông Ích Khiêm - Trạm 07 Trưng Nữ Vương",
    status: "Hoàn thành",
  },
  {
    id: "5",
    title: "Tuyến 08",
    date: "25/05/2025",
    route: "Trạm 11 Sân Bay - Trạm 04 Lê Duẩn",
    status: "Hoàn thành",
  },
  {
    id: "6",
    title: "Tuyến 03",
    date: "24/05/2025",
    route: "Trạm 02 Phan Châu Trinh - Trạm 08 Ngũ Hành Sơn",
    status: "Đã hủy",
  },
];

type ActiveTab = "Tất cả" | "Hoàn thành" | "Đã hủy";

const HistoryScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState<ActiveTab>("Tất cả");

  const filteredHistory = MOCK_HISTORY.filter((item) => {
    // Filter by active tab
    if (activeTab === "Hoàn thành" && item.status !== "Hoàn thành")
      return false;
    if (activeTab === "Đã hủy" && item.status !== "Đã hủy") return false;

    // Filter by search text (checks title, route, and date)
    const searchLower = searchText.toLowerCase();
    if (
      searchText &&
      !item.title.toLowerCase().includes(searchLower) &&
      !item.route.toLowerCase().includes(searchLower) &&
      !item.date.toLowerCase().includes(searchLower)
    ) {
      return false;
    }

    // Passed all filters
    return true;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0284c7" />

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
      />
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Changed from dark theme to match History.png
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9", // Lighter border than search divider
  },
  listContent: {
    paddingBottom: 16,
    // No horizontal padding, cards are full-width
  },
});
