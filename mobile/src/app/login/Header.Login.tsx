import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@constants/theme";

const HeaderLogin = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Đăng nhập</Text>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Chưa có tài khoản? </Text>
        <TouchableOpacity>
          <Text style={[styles.subtitle, styles.link]}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
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
