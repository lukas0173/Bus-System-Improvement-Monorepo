import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

import { Colors, Spacing, FontSize } from "@/src/constants/theme";
import { UIRoute } from "@/src/types/UI/route";

const HeaderDetailRoute = ({ route }: { route: UIRoute }) => {
  const nav = useRouter();
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => nav.back()}>
        <ArrowLeft size={24} color={Colors.info[50]} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{route.name}</Text>
      <View style={{ width: 40 }} />
    </View>
  );
};

export default HeaderDetailRoute;

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
    textAlign: 'center',
  },
});
