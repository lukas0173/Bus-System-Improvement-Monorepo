import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors, FontSize, Spacing } from "@constants/theme";

const TabRouteHome = ({
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

export default TabRouteHome;

const styles = StyleSheet.create({
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabItemActive: {
    borderBottomColor: Colors.info[300],
  },
  tabText: {
    fontSize: FontSize.md,
    fontWeight: "medium",
    color: Colors.secondary[400],
  },
  tabTextActive: {
    color: Colors.info[300],
    fontWeight: "bold",
  },
});
