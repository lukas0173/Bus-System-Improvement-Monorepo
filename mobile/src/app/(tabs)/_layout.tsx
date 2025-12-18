import { Tabs } from "expo-router";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { House, Wallet, ScanQrCode, History, User } from "lucide-react-native";
import { Colors } from "@constants/theme";
import { BusProvider } from "@/src/context/BusContext";
import { TripHistoryProvider } from "@/src/context/TripHistoryContext";
import { RouteProvider } from "@/src/context/RouteContext";
import { StationProvider } from "@/src/context/StationContext";

const iconSize = 22;

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
    paddingTop: 5,
    backgroundColor: "white",
    height: 70,
  },
  tabBarLabelStyle: {
    fontSize: 12,
  },
};

export default function TabLayout() {
  return (
    <BusProvider>
      <StationProvider>
        <RouteProvider>
          <TripHistoryProvider>
            <Tabs screenOptions={tabScreenOptions}>
              <Tabs.Screen
                name="home"
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
                  tabBarLabel: () => null, // Disable icon title
                  tabBarIcon: ({ focused }) => (
                    <ScanQrCode size={iconSize} color="#fff" />
                  ),
                  tabBarButton: (props) => {
                    return <CustomScanButton {...props} />;
                  },
                }}
              />
              <Tabs.Screen
                name="history"
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
          </TripHistoryProvider>
        </RouteProvider>
      </StationProvider>
    </BusProvider>
  );
}

const styles = StyleSheet.create({
  customScanButtonContainer: {
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  customScanButton: {
    width: 55,
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: Colors.info[400],
    justifyContent: "center",
    alignItems: "center",
  },
});
