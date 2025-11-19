import { Link } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Clock, Bus } from "lucide-react-native";

import { HistoryItem } from "@/src/types/history";
import { BorderRadius, Colors, FontSize, Spacing } from "@constants/theme";

const ItemHistory = ({ item }: { item: HistoryItem }) => {
  // Helper to get styles based on status
  const getStatusStyles = (status: HistoryItem["status"]) => {
    if (status === "Hoàn thành") {
      return {
        badge: { backgroundColor: Colors.success[900] },
        text: { color: Colors.success[50] },
      };
    }
    if (status === "Đã hủy") {
      return {
        badge: { backgroundColor: Colors.error[900] },
        text: { color: Colors.error[50] },
      };
    }
    // Default/fallback style
    return {};
  };

  const statusStyle = getStatusStyles(item.status);

  console.log(item.title);
  return (
    <Link href={`/history/${item.title}`} asChild>
      <TouchableOpacity style={styles.card}>
        <View style={styles.cardTopRow}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={[styles.statusBadge, statusStyle.badge]}>
            <Text style={[styles.statusText, statusStyle.text]}>
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Clock size={16} color={Colors.info[50]} style={styles.icon} />
          <Text style={styles.infoText}>{item.date}</Text>
        </View>

        <View style={styles.infoRow}>
          <Bus size={16} color={Colors.info[50]} style={styles.icon} />
          <Text style={styles.infoText}>{item.route}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default ItemHistory;

const styles = StyleSheet.create({
  card: {
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary[300],
  },
  cardTopRow: {
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
  statusBadge: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.xs,
  },
  statusText: {
    fontSize: FontSize.xs,
    fontWeight: "medium",
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
});
