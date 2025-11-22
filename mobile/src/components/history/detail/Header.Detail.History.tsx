import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

import { Colors, Spacing, FontSize } from "@/src/constants/theme";
import { UITripHistoryDetail } from "@/src/types/UI/trip-history";

const HeaderDetailHistory = ({ trip }: { trip: UITripHistoryDetail }) => {
  const router = useRouter();
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={24} color={Colors.info[50]} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{trip.route.name}</Text>
      <View style={{ width: 40 }} />
    </View>
  );
};

export default HeaderDetailHistory;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  backButton: {
    padding: Spacing.sm,
    marginLeft: -Spacing.sm,
  },
  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: "bold",
    color: Colors.info[50],
  },
});
