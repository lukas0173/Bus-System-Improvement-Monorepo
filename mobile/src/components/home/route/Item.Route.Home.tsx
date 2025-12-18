import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Code, FileText } from "lucide-react-native";
import { useRouter } from "expo-router";

import { UIRoute } from "@/src/types/UI/route";
import { BorderRadius, Colors, FontSize, Spacing } from "@constants/theme";
import getStatusStyles from "@/src/utils/status-style";

const ItemRouteHome = ({ item }: { item: UIRoute }) => {
  const router = useRouter();
  const statusStyle = getStatusStyles(item.status);

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => router.push(`/home/route/${item.id}`)}
    >
      <View style={styles.cardTopRow}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <View style={[styles.statusBadge, statusStyle.badge]}>
          <Text style={[styles.statusText, statusStyle.text]}>
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <FileText size={16} color={Colors.info[50]} style={styles.icon} />
          <Text style={styles.infoText}>{item.description}</Text>
        </View>
        <View style={styles.infoRow}>
          <Code size={16} color={Colors.info[50]} style={styles.icon} />
          <Text style={styles.infoText}>{item.code}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ItemRouteHome;

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
    flex: 1, // Allow title to take up space
    marginRight: Spacing.sm,
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
  infoContainer: {
    marginTop: Spacing.xs,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start", // Align top for multiline text
    marginTop: Spacing.xs,
  },
  icon: {
    marginRight: Spacing.xs,
    marginTop: 2, // Minor adjustment for alignment
  },
  infoText: {
    fontSize: FontSize.sm,
    color: Colors.info[50],
    flex: 1,
  },
});
