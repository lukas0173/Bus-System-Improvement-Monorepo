import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors, BorderRadius, Spacing, FontSize } from "@constants/theme";
import { useRouter } from "expo-router";

const ActionButtonHome = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => {
  const router = useRouter();
  return (
    <View style={styles.actionButton}>
      <TouchableOpacity
        style={styles.actionButtonIconContainer}
        onPress={() => router.navigate("/home/Bus.Home.Screen")}
      >
        {icon}
      </TouchableOpacity>
      <Text style={styles.actionButtonLabel}>{label}</Text>
    </View>
  );
};

export default ActionButtonHome;

const styles = StyleSheet.create({
  actionButton: {
    alignItems: "center",
  },
  actionButtonIconContainer: {
    backgroundColor: Colors.info[400],
    width: 60,
    height: 60,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.xs,
  },
  actionButtonLabel: {
    fontSize: FontSize.sm,
    color: Colors.secondary[500],
  },
});
