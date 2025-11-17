import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Tag, Clock, QrCode } from "lucide-react-native";

import { Colors, Spacing, BorderRadius, FontSize } from "@constants/theme";
import { Ticket } from "@/src/types/ticket";

const CardTicket = ({ item }: { item: Ticket }) => {
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

export default CardTicket;

const styles = StyleSheet.create({
  listContent: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  card: {
    backgroundColor: Colors.info[950],
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    boxShadow: "0px 1.5px 2px 0px rgba(0, 0, 0, 0.25)",
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
