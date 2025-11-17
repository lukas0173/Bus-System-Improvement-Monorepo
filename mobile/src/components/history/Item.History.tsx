import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Clock, Bus } from "lucide-react-native";

import { HistoryItem } from "@/src/types/history";

const ItemHistory = ({ item }: { item: HistoryItem }) => {
  // Helper to get styles based on status
  const getStatusStyles = (status: HistoryItem["status"]) => {
    if (status === "Hoàn thành") {
      return {
        badge: { backgroundColor: "#dcfce7" },
        text: { color: "#16a34a" },
      };
    }
    if (status === "Đã hủy") {
      return {
        badge: { backgroundColor: "#fee2e2" },
        text: { color: "#dc2626" },
      };
    }
    // Default/fallback style
    return {
      badge: { backgroundColor: "#e2e8f0" },
      text: { color: "#334155" },
    };
  };

  const statusStyle = getStatusStyles(item.status);

  return (
    <View style={styles.card}>
      <View style={styles.cardTopRow}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={[styles.statusBadge, statusStyle.badge]}>
          <Text style={[styles.statusText, statusStyle.text]}>
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Clock size={16} color="#64748b" style={styles.icon} />
        <Text style={styles.infoText}>{item.date}</Text>
      </View>

      <View style={styles.infoRow}>
        <Bus size={16} color="#64748b" style={styles.icon} />
        <Text style={styles.infoText}>{item.route}</Text>
      </View>
    </View>
  );
};

export default ItemHistory;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9", // Very light separator
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20, // Fully rounded
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500", // 'medium'
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6, // A bit of space between info rows
  },
  icon: {
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#64748b",
  },
});
