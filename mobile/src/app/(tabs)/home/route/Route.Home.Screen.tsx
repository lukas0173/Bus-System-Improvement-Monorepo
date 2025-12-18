import React, { useState } from "react";
import { View, StyleSheet, FlatList, RefreshControl } from "react-native";

import { Spacing, Colors } from "@constants/theme";
import HeaderRouteHome from "@components/home/route/Header.Route.Home";
import TabRouteHome from "@components/home/route/Tab.Route.Home";
import ItemRouteHome from "@components/home/route/Item.Route.Home";
import { useRoutes } from "@/src/context/RouteContext";

type ActiveTab = "Tất cả" | "Hoạt động" | "Tạm dừng";

const RouteHomeScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState<ActiveTab>("Tất cả");

  const { routes, isLoading, refetch } = useRoutes();

  const filteredRoutes = routes.filter((item) => {
    // Filter by active tab
    if (activeTab === "Hoạt động" && item.status !== "active") return false;
    if (activeTab === "Tạm dừng" && item.status !== "stopped") return false;

    // Filter by search text (checks name and description)
    const searchLower = searchText.toLowerCase();
    if (
      searchText &&
      !item.name.toLowerCase().includes(searchLower) &&
      !item.description.toLowerCase().includes(searchLower)
    ) {
      return false;
    }

    // Passed all filters
    return true;
  });

  return (
    <View style={styles.container}>
      <HeaderRouteHome searchText={searchText} setSearchText={setSearchText} />

      {/* --- Tabs Section --- */}
      <View style={styles.tabsContainer}>
        <TabRouteHome
          label="Tất cả"
          isActive={activeTab === "Tất cả"}
          onPress={() => setActiveTab("Tất cả")}
        />
        <TabRouteHome
          label="Hoạt động"
          isActive={activeTab === "Hoạt động"}
          onPress={() => setActiveTab("Hoạt động")}
        />
        <TabRouteHome
          label="Tạm dừng"
          isActive={activeTab === "Tạm dừng"}
          onPress={() => setActiveTab("Tạm dừng")}
        />
      </View>

      {/* Route list */}
      <FlatList
        data={filteredRoutes}
        renderItem={({ item }) => <ItemRouteHome item={item} />}
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

export default RouteHomeScreen;

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
