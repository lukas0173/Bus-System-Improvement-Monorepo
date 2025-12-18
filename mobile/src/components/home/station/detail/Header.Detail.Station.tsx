import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

import { Colors, Spacing, FontSize } from "@/src/constants/theme";
import { UIStation } from "@/src/types/UI/station";

const HeaderDetailStation = ({ station }: { station: UIStation }) => {
  const router = useRouter();
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={24} color={Colors.info[50]} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{station.name}</Text>
      <View style={{ width: 40 }} />
    </View>
  );
};

export default HeaderDetailStation;

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
    flex: 1,
    textAlign: "center",
  },
});
