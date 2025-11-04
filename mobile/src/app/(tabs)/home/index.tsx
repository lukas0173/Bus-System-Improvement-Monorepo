import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import {
  List,
  Shuffle,
  Pause,
  Bus,
  Home,
  Wallet,
  QrCode,
  History,
  User,
} from "lucide-react-native";
import HeaderHome from "@components/home/Header.Home";
import { Colors } from "@constants/theme";
import SearchBarHome from "@/src/components/home/SearchBar.Home";

// Improvement: Each action button is an instance of this component,
// reducing code duplication.
const ActionButton = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <View style={styles.actionButton}>
    <TouchableOpacity style={styles.actionButtonIconContainer}>
      {icon}
    </TouchableOpacity>
    <Text style={styles.actionButtonLabel}>{label}</Text>
  </View>
);

const ActionButtons = () => (
  <View style={styles.actionsContainer}>
    <ActionButton icon={<List color="white" size={28} />} label="Tra cứu" />
    <ActionButton
      icon={<Shuffle color="white" size={28} />}
      label="Tuyến đường"
    />
    <ActionButton icon={<Pause color="white" size={28} />} label="Trạm" />
    <ActionButton icon={<Bus color="white" size={28} />} label="Xe buýt" />
  </View>
);

// Improvement: The bottom tab bar is a custom component, giving you full control over its appearance.
const BottomTabBar = () => (
  <View style={styles.tabBarContainer}>
    <View style={styles.tabBar}>
      <TouchableOpacity style={styles.tabItem}>
        <Home color={Colors.info[400]} size={28} />
        <Text style={[styles.tabLabel, styles.activeTabLabel]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem}>
        <Wallet color={Colors.secondary[500]} size={28} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tabItem, styles.qrCodeButton]}>
        <QrCode color="white" size={32} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem}>
        <History color={Colors.secondary[500]} size={28} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem}>
        <User color={Colors.secondary[500]} size={28} />
      </TouchableOpacity>
    </View>
  </View>
);

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.primary[950]}
      />
      <View style={styles.content}>
        <HeaderHome />
        <SearchBarHome />
        <ActionButtons />
        {/*<MapView
          style={styles.map}
          initialRegion={{
            latitude: 16.0544, // Da Nang Latitude
            longitude: 108.2022, // Da Nang Longitude
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />*/}
      </View>
      <BottomTabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary[950],
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchContainer: {
    marginVertical: 10,
  },
  searchLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.secondary[500],
    marginBottom: 8,
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    height: 50,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  actionButton: {
    alignItems: "center",
  },
  actionButtonIconContainer: {
    backgroundColor: Colors.info[400],
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionButtonLabel: {
    fontSize: 14,
    color: Colors.secondary[500],
  },
  map: {
    flex: 1,
    borderRadius: 15,
    overflow: "hidden",
  },
  tabBarContainer: {
    backgroundColor: Colors.primary[950],
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 80,
    paddingBottom: 10,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  activeTabLabel: {
    color: Colors.info[400],
    fontWeight: "600",
  },
  qrCodeButton: {
    backgroundColor: Colors.info[400],
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    bottom: 30, // This elevates the button
    borderWidth: 5,
    borderColor: "white",
  },
});
