import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors, FontSize, Spacing } from "@constants/theme";

const TabTicket = ({
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

export default TabTicket;

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: Colors.primary[950],
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary[500],
  },
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
