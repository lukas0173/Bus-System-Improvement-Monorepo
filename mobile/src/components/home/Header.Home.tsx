import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Bell } from "lucide-react-native";
import { Colors } from "@constants/theme";

const HeaderHome = () => (
  <View style={styles.headerContainer}>
    <View style={styles.userInfoContainer}>
      {/*<Image source={require("")} style={styles.avatar} />*/}
      <View>
        <Text style={styles.userName}>John Smith</Text>
        <Text style={styles.userLocation}>Da Nang</Text>
      </View>
    </View>
    <TouchableOpacity>
      <Bell color={Colors.secondary[500]} size={24} />
    </TouchableOpacity>
  </View>
);
export default HeaderHome;
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.secondary[500],
  },
  userLocation: {
    fontSize: 14,
    color: Colors.secondary[700],
  },
});
