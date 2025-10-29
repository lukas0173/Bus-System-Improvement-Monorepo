import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
    bottom: 15,
    left: 20,
    right: 20,
    elevation: 5,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    height: 70,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    marginTop: -5,
  },
};

export default function TabLayout() {
  return (
    <Tabs screenOptions={tabScreenOptions}>
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Homeads ",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ticket/index"
        options={{
          title: "Ticket",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "wallet" : "wallet-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scan/index"
        options={{
          title: "", // Hide label for the scan button
          tabBarIcon: ({ focused }) => (
            <Ionicons name="qr-code" size={34} color="#fff" />
          ),
          tabBarButton: (props) => <CustomScanButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="history/index"
        options={{
          title: "History",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "time" : "time-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  customScanButtonContainer: {
    top: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  customScanButton: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
