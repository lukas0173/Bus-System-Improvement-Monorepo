import { Link } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Clock, Bus } from "lucide-react-native";

import { UITripHistory } from "@/src/types/UI/trip-history";
import { BorderRadius, Colors, FontSize, Spacing } from "@constants/theme";
import getStatusStyles from "@/src/utils/status-style";

const ItemHistory = ({ item }: { item: UITripHistory }) => {
  const statusStyle = getStatusStyles(item.status);

  return (
    <Link href={`/history/${item.routeName}`} asChild>
      <TouchableOpacity style={styles.card}>
        <View style={styles.cardTopRow}>
          <Text style={styles.cardTitle}>{item.routeName}</Text>
          <View style={[styles.statusBadge, statusStyle.badge]}>
            <Text style={[styles.statusText, statusStyle.text]}>
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Clock size={16} color={Colors.info[50]} style={styles.icon} />
          <Text style={styles.infoText}>{item.created}</Text>
        </View>

        <View style={styles.infoRow}>
          <Bus size={16} color={Colors.info[50]} style={styles.icon} />
          <Text style={styles.infoText}>{item.busName}</Text>
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
