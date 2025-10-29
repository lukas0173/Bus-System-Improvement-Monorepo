import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { House, Wallet, ScanQrCode, History, User } from "lucide-react-native";

const iconSize = 25;

const CustomScanButton = ({ children, onPress }: any) => {
  return (
    <View style={styles.customScanButtonContainer}>
      <View style={styles.customScanButton}>{children}</View>
    </View>
  );
};

const tabScreenOptions: any = {
  tabBarShowLabel: true,
  tabBarActiveTintColor: "#2196F3",
  tabBarInactiveTintColor: "gray",
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    left: 20,
    right: 20,
    paddingTop: 10,
    backgroundColor: "#ffffff",
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarLabelStyle: {
    fontSize: 12,
  },
};

export default function TabLayout() {
  return (
    <Tabs screenOptions={tabScreenOptions}>
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <House size={iconSize} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ticket/index"
        options={{
          title: "Ticket",
          tabBarIcon: ({ color, focused }) => (
            <Wallet size={iconSize} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan/index"
        options={{
          title: "", // Hide label for the scan button
          tabBarIcon: ({ focused }) => (
            <ScanQrCode size={iconSize} color="#fff" />
          ),
          tabBarButton: (props) => <CustomScanButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="history/index"
        options={{
          title: "History",
          tabBarIcon: ({ color, focused }) => (
            <History size={iconSize} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <User size={iconSize} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  customScanButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  customScanButton: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: "#2196F3",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
