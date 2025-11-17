import React, { useState } from "react";
import { View, StyleSheet, StatusBar } from "react-native";

import { Colors, Spacing } from "@constants/theme";
import HeaderHistory from "@components/history/Header.History";
import TabHistory from "@components/history/Tab.History";

const TicketScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Single" | "Inter">("All");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.info[200]} />

      <HeaderHistory searchText={searchText} setSearchText={setSearchText} />
      {/* --- Tabs Section --- */}
      <View style={styles.tabsContainer}>
        <TabHistory
          label="Tất cả"
          isActive={activeTab === "All"}
          onPress={() => setActiveTab("All")}
        />
        <TabHistory
          label="Hoàn thành"
          isActive={activeTab === "Single"}
          onPress={() => setActiveTab("Single")}
        />
        <TabHistory
          label="Đã hủy"
          isActive={activeTab === "Inter"}
          onPress={() => setActiveTab("Inter")}
        />
      </View>
    </View>
  );
};

export default TicketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary[950],
  },

  tabsContainer: {
    flexDirection: "row",
    backgroundColor: Colors.primary[950],
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary[500],
  },
  // Card Styles
  listContent: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
});
