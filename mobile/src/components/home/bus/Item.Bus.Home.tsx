import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Clock, MapPin, Box, IdCard } from "lucide-react-native";

import { Bus as BusType } from "@/src/types/bus";
import { BorderRadius, Colors, FontSize, Spacing } from "@constants/theme";
import getStatusStyles from "@/src/utils/status-style";

const ItemBusHome = ({ item }: { item: BusType }) => {
  const statusStyle = getStatusStyles(item.status);

  return (
    <View style={styles.card}>
      <View style={styles.cardTopRow}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <View style={[styles.statusBadge, statusStyle.badge]}>
          <Text style={[styles.statusText, statusStyle.text]}>
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoLeft}>
          <View style={styles.infoRow}>
            <Clock size={16} color={Colors.info[50]} style={styles.icon} />
            <Text style={styles.infoText}>{item.lastUpdate}</Text>
          </View>

          <View style={styles.infoRow}>
            <MapPin size={16} color={Colors.info[50]} style={styles.icon} />
            <Text style={styles.infoText}>{item.position}</Text>
          </View>

          <View style={styles.infoRow}>
            <Box size={16} color={Colors.info[50]} style={styles.icon} />
            <Text style={styles.infoText}>{item.capacity}</Text>
          </View>
        </View>
        <View style={styles.infoRight}>
          <View style={styles.infoRow}>
            <IdCard size={16} color={Colors.info[50]} style={styles.icon} />
            <Text style={{ ...styles.infoText, fontWeight: "bold" }}>
              {item.licensePlate}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default ItemBusHome;

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
  infoContainer: {
    flexDirection: "row",
  },
  infoLeft: {},
  infoRight: {
    flex: 1,
    alignItems: "flex-end",
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
