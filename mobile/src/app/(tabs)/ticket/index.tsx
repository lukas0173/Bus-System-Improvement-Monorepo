import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import { Search, Filter } from "lucide-react-native";

import { BorderRadius, Colors, FontSize, Spacing } from "@constants/theme";
import { Ticket } from "@/src/types/ticket";
import CardTicket from "@components/ticket/Card.Ticket";

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

  const RenderTab = ({
    label,
    isActive,
    onPress,
  }: {
    label: string;
    isActive: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={[styles.tabItem, isActive && styles.tabItemActive]}
      onPress={onPress}
    >
      <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.info[200]} />

      {/* --- Header Section --- */}
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.headerTitle}>Quản lý vé</Text>

          <View style={styles.searchContainer}>
            <Search
              size={20}
              color={Colors.secondary[800]}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm..."
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor={Colors.secondary[800]}
            />
            <View style={styles.searchDivider} />
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color={Colors.secondary[800]} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* --- Tabs Section --- */}
      <View style={styles.tabsContainer}>
        <RenderTab
          label="Tất cả"
          isActive={activeTab === "All"}
          onPress={() => setActiveTab("All")}
        />
        <RenderTab
          label="Đơn tuyến"
          isActive={activeTab === "Single"}
          onPress={() => setActiveTab("Single")}
        />
        <RenderTab
          label="Liên tuyến"
          isActive={activeTab === "Inter"}
          onPress={() => setActiveTab("Inter")}
        />
      </View>

      {/* --- List Section --- */}
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
  headerContainer: {
    backgroundColor: Colors.info[200],
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: BorderRadius.sm,
    height: 40,
    paddingHorizontal: Spacing.sm,
  },
  searchIcon: {
    marginRight: Spacing.xs,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.secondary[800],
    height: "100%",
  },
  searchDivider: {
    width: 1,
    height: 20,
    backgroundColor: Colors.primary[300],
    marginRight: Spacing.xs,
  },
  filterButton: {
    padding: Spacing.xs,
  },

  tabsContainer: {
    flexDirection: "row",
    backgroundColor: Colors.primary[950],
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary[500],
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabItemActive: {
    borderBottomColor: Colors.info[300],
  },
  tabText: {
    fontSize: FontSize.md,
    fontWeight: "medium",
    color: Colors.secondary[400],
  },
  tabTextActive: {
    color: Colors.info[300],
    fontWeight: "bold",
  },

  // Card Styles
  listContent: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
});
