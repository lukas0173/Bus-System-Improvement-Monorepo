import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

import { Colors, Spacing, FontSize } from "@/src/constants/theme";
import { UIBus } from "@/src/types/UI/bus";

const HeaderDetailBus = ({ bus }: { bus: UIBus }) => {
  const router = useRouter();
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={24} color={Colors.info[50]} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{bus.name}</Text>
      <View style={{ width: 40 }} />
    </View>
  );
};

export default HeaderDetailBus;

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
