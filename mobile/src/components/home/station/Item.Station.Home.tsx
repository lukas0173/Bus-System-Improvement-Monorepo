import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MapPin, Navigation } from "lucide-react-native";
// import { useRouter } from "expo-router"; // Use when Detail screen is ready

import { UIStation } from "@/src/types/UI/station";
import { BorderRadius, Colors, FontSize, Spacing } from "@constants/theme";
import getStatusStyles from "@/src/utils/status-style";

const ItemStationHome = ({ item }: { item: UIStation }) => {
  // const router = useRouter(); 
  const statusStyle = getStatusStyles(item.status);

  return (
    <TouchableOpacity 
      style={styles.card}
      // onPress={() => router.push(`/home/station/${item.id}`)} // Uncomment when detail screen exists
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
          <MapPin size={16} color={Colors.info[50]} style={styles.icon} />
          <Text style={styles.infoText}>{item.address}</Text>
        </View>
        <View style={styles.infoRow}>
          <Navigation size={16} color={Colors.info[50]} style={styles.icon} />
          <Text style={styles.infoText}>{item.latitude.toFixed(6)}, {item.longitude.toFixed(6)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ItemStationHome;

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
    flex: 1,
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
    alignItems: "flex-start",
    marginTop: Spacing.xs,
  },
  icon: {
    marginRight: Spacing.xs,
    marginTop: 2,
  },
  infoText: {
    fontSize: FontSize.sm,
    color: Colors.info[50],
    flex: 1,
  },
});
