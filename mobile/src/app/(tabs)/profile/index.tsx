import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const user = {
    name: "Võ Tứng Kiệc",
    email: "vuwin24680@gmail.com",
    phone: "0392527932",
    avatar: require("@assets/images/home/User.jpeg"),
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.locationButton}>
          <Feather name="map-pin" size={16} color="#4A4A4A" />
          <Text style={styles.locationText}>Đà Nẵng</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="bell" size={24} color="#4A4A4A" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Image source={user.avatar} style={styles.avatar} />
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileEmail}>{user.email}</Text>
        <Text style={styles.profilePhone}>{user.phone}</Text>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Tài khoản & Bảo mật</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.menuItem}>
            <Feather name="user" size={22} color="#007AFF" />
            <Text style={styles.menuItemText}>Chỉnh sửa thông tin cá nhân</Text>
            <Feather name="chevron-right" size={22} color="#C7C7CC" />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.menuItem}>
            <Feather name="key" size={22} color="#007AFF" />
            <Text style={styles.menuItemText}>Thay đổi mật khẩu</Text>
            <Feather name="chevron-right" size={22} color="#C7C7CC" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Cài đặt ứng dụng</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.menuItem}>
            <Feather name="bell" size={22} color="#007AFF" />
            <Text style={styles.menuItemText}>Thông báo</Text>
            <Feather name="chevron-right" size={22} color="#C7C7CC" />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.menuItem}>
            <Feather name="globe" size={22} color="#007AFF" />
            <Text style={styles.menuItemText}>Ngôn ngữ</Text>
            <Feather name="chevron-right" size={22} color="#C7C7CC" />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.menuItem}>
            <Feather name="sun" size={22} color="#007AFF" />
            <Text style={styles.menuItemText}>Giao diện</Text>
            <Feather name="chevron-right" size={22} color="#C7C7CC" />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="accessibility-outline" size={22} color="#007AFF" />
            <Text style={styles.menuItemText}>Trợ năng</Text>
            <Feather name="chevron-right" size={22} color="#C7C7CC" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 20,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#E0E0E0",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  locationText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#4A4A4A",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0A2E4A",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: "#6C7A89",
    marginBottom: 4,
  },
  profilePhone: {
    fontSize: 16,
    color: "#6C7A89",
  },
  menuSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0A2E4A",
    marginBottom: 15,
    marginLeft: 5,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  menuItemText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: "#1D2939",
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginVertical: 2,
  },
  logoutButton: {
    backgroundColor: "#EE2E31",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 40,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
