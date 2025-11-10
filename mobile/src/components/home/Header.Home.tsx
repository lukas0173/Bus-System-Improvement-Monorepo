import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Bell } from "lucide-react-native";
import { Colors, Spacing, FontSize } from "@constants/theme";

const HeaderHome = () => (
  <View style={styles.headerContainer}>
    <View style={styles.userInfoContainer}>
      <Image
        source={require("@/assets/images/home/User.jpeg")}
        style={styles.avatar}
      />
      <View>
        <Text style={styles.userName}>John Smith</Text>
        <Text style={styles.userLocation}>Da Nang</Text>
      </View>
    </View>
    <TouchableOpacity>
      <Bell color={Colors.secondary[500]} size={23} />
    </TouchableOpacity>
  </View>
);
export default HeaderHome;
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.md,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: Spacing.sm,
  },
  userName: {
    fontSize: FontSize.lg,
    fontWeight: "bold",
    color: Colors.secondary[500],
  },
  userLocation: {
    fontSize: FontSize.sm,
    color: Colors.secondary[700],
  },
});
