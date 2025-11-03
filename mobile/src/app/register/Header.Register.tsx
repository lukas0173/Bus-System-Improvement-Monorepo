import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@constants/theme";

const HeaderLogin = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Đăng Ký</Text>
      <View style={styles.subtitleContainer}></View>
    </View>
  );
};

export default HeaderLogin;

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.info[50],
    marginBottom: 8,
  },
  subtitleContainer: {
    flexDirection: "row",
  },
  subtitle: {
    fontSize: 16,
    color: Colors.secondary[400],
  },
  link: {
    color: Colors.info[300],
  },
});
