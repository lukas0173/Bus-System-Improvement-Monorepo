import { Tabs } from "expo-router";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { House, Wallet, ScanQrCode, History, User } from "lucide-react-native";
import { Colors } from "@constants/theme";

const iconSize = 25;

const CustomScanButton = ({ children, onPress }: any) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={styles.customScanButtonContainer}>
        <View style={styles.customScanButton}>{children}</View>
      </View>
    </TouchableOpacity>
  );
};

const tabScreenOptions: any = {
  tabBarShowLabel: true,
  tabBarActiveTintColor: Colors.info[400],
  tabBarInactiveTintColor: Colors.secondary[700],
  headerShown: false,
  tabBarPosition: "bottom",
  tabBarStyle: {
    paddingTop: 10,
    backgroundColor: "white",
    height: 90,
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
          tabBarButton: (props) => {
            return <CustomScanButton {...props} />;
          },
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
