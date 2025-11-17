import React, { useState } from "react";
import { View, StyleSheet, FlatList, StatusBar } from "react-native";

import { Colors, Spacing } from "@constants/theme";
import { Ticket } from "@/src/types/ticket";
import CardTicket from "@components/ticket/Card.Ticket";
import HeaderTicket from "@components/ticket/Header.Ticket";
import TabTicket from "@components/ticket/Tab.Ticket";

const MOCK_TICKETS: Ticket[] = [
  {
    id: "1",
    title: "Vé tháng bình thường",
    code: "V2-BT",
    type: "Liên tuyến",
    month: "Tháng 10",
  },
  {
    id: "2",
    title: "Vé tháng bình thường",
    code: "V1-BT",
    type: "Đơn tuyến",
    month: "Tháng 10",
    routeInfo: "22B - Bến xe Giáp Bát - Đô Nghĩa",
  },
];

const TicketScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Single" | "Inter">("All");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.info[200]} />

      <HeaderTicket searchText={searchText} setSearchText={setSearchText} />
      {/* --- Tabs Section --- */}
      <View style={styles.tabsContainer}>
        <TabTicket
          label="Tất cả"
          isActive={activeTab === "All"}
          onPress={() => setActiveTab("All")}
        />
        <TabTicket
          label="Đơn tuyến"
          isActive={activeTab === "Single"}
          onPress={() => setActiveTab("Single")}
        />
        <TabTicket
          label="Liên tuyến"
          isActive={activeTab === "Inter"}
          onPress={() => setActiveTab("Inter")}
        />
      </View>

      {/* Ticket list */}
      <FlatList
        data={MOCK_TICKETS}
        renderItem={({ item }) => <CardTicket item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
