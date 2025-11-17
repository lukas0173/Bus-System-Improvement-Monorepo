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
import { Search, Filter, Tag, Clock, QrCode } from "lucide-react-native";

import { BorderRadius, Colors, FontSize, Spacing } from "@constants/theme";

// --- Types & Interfaces ---
interface Ticket {
  id: string;
  title: string;
  code: string;
  type: "Liên tuyến" | "Đơn tuyến";
  month: string;
  routeInfo?: string;
}

// --- Mock Data ---
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

const TicketManagementScreen = () => {
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

  const RenderTicketCard = ({ item }: { item: Ticket }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardCode}>{item.code}</Text>
        </View>
        <View style={styles.cardContentContainer}>
          {/* Left Content */}
          <View style={styles.cardContent}>
            <View style={styles.infoRow}>
              <Tag size={16} color={Colors.info[50]} style={styles.icon} />
              <Text style={styles.infoText}>{item.type}</Text>
            </View>

            <View style={styles.infoRow}>
              <Clock size={16} color={Colors.info[50]} style={styles.icon} />
              <Text style={styles.infoText}>{item.month}</Text>
            </View>

            {item.routeInfo && (
              <Text style={styles.routeText}>{item.routeInfo}</Text>
            )}
          </View>

          {/* Right Action (QR) */}
          <View style={styles.qrContainer}>
            <TouchableOpacity style={styles.qrButton}>
              <QrCode size={24} color={Colors.info[50]} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

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
        renderItem={({ item }) => <RenderTicketCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TicketManagementScreen;

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
  card: {
    backgroundColor: Colors.info[950],
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    alignItems: "center",
  },
  cardHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xs,
  },
  cardTitle: {
    fontSize: FontSize.md,
    fontWeight: "bold",
    color: Colors.info[50],
  },
  cardCode: {
    fontSize: FontSize.sm,
    color: Colors.info[50],
  },
  cardContentContainer: {
    flexDirection: "row",
  },
  cardContent: {
    flex: 1,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.xs,
  },
  icon: {
    marginRight: Spacing.xs,
  },
  infoText: {
    fontSize: FontSize.sm,
    color: Colors.info[50],
  },
  routeText: {
    marginTop: FontSize.xs,
    fontSize: FontSize.sm,
    color: Colors.info[50],
    opacity: 0.7,
  },

  // QR Button Styles
  qrContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  qrButton: {
    width: 45,
    height: 45,
    backgroundColor: `rgba(87,194,246, 0.4)`,
    borderRadius: BorderRadius.sm,
    justifyContent: "center",
    alignItems: "center",
  },
});
