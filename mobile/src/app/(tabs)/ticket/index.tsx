import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Search, Filter, Tag, Clock, QrCode } from "lucide-react-native";

import { Colors } from "@constants/theme";

// --- Types & Interfaces ---
interface Ticket {
  id: string;
  title: string;
  code: string; // e.g., "V2-BT"
  type: "Liên tuyến" | "Đơn tuyến";
  month: string;
  routeInfo?: string; // Optional, as "Liên tuyến" might not have it
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
              <Tag size={16} color="#005F8F" style={styles.icon} />
              <Text style={styles.infoText}>{item.type}</Text>
            </View>

            <View style={styles.infoRow}>
              <Clock size={16} color="#005F8F" style={styles.icon} />
              <Text style={styles.infoText}>{item.month}</Text>
            </View>

            {item.routeInfo && (
              <Text style={styles.routeText}>{item.routeInfo}</Text>
            )}
          </View>

          {/* Right Action (QR) */}
          <View style={styles.qrContainer}>
            <TouchableOpacity style={styles.qrButton}>
              <QrCode size={24} color="#005F8F" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0085C8" />

      {/* --- Header Section --- */}
      <View style={styles.headerContainer}>
        <SafeAreaView>
          <Text style={styles.headerTitle}>Quản lý vé</Text>

          <View style={styles.searchContainer}>
            <Search size={20} color="#888" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm..."
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#888"
            />
            <View style={styles.searchDivider} />
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
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
    backgroundColor: Colors.info[200], // Primary Blue from design
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 10, // Adjust based on status bar preference
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    height: 44,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.secondary[800],
    height: "100%",
  },
  searchDivider: {
    width: 1,
    height: 24,
    backgroundColor: Colors.primary[300],
    marginHorizontal: 10,
  },
  filterButton: {
    padding: 4,
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
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabItemActive: {
    borderBottomColor: Colors.info[300],
  },
  tabText: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.secondary[400],
  },
  tabTextActive: {
    color: Colors.info[300],
    fontWeight: "600",
  },

  // Card Styles
  listContent: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: Colors.info[950],
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  cardHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.info[50],
  },
  cardCode: {
    fontSize: 14,
    color: Colors.info[50],
  },
  cardContentContainer: {
    flexDirection: "row",
  },
  cardContent: {
    flex: 1,
    marginRight: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  icon: {
    marginRight: 6,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
  },
  routeText: {
    marginTop: 8,
    fontSize: 14,
    color: "#556677",
  },

  // QR Button Styles
  qrContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  qrButton: {
    width: 48,
    height: 48,
    backgroundColor: "#CDE9FA", // QR bg color
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
