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

// --- Types & Interfaces ---
// Improvement: Define shapes for your data to prevent bugs
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

  // --- Sub-Components ---

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
        {/* Left Content */}
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardCode}>{item.code}</Text>
          </View>

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
    backgroundColor: "#FFFFFF",
  },
  // Header Styles
  headerContainer: {
    backgroundColor: "#0085C8", // Primary Blue from design
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 10, // Adjust based on status bar preference
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
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
    color: "#333",
    height: "100%",
  },
  searchDivider: {
    width: 1,
    height: 24,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 10,
  },
  filterButton: {
    padding: 4,
  },

  // Tab Styles
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabItemActive: {
    borderBottomColor: "#0085C8",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#666666",
  },
  tabTextActive: {
    color: "#0085C8",
    fontWeight: "600",
  },

  // Card Styles
  listContent: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: "#F0F9FF", // Very light blue background
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    // Optional: Add slight shadow if desired, though design looks flat/clean
  },
  cardContent: {
    flex: 1,
    marginRight: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700", // Bold title
    color: "#004060", // Darker blue for text
  },
  cardCode: {
    fontSize: 14,
    color: "#555",
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
