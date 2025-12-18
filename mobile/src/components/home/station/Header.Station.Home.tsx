import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Search, Filter, ArrowLeft } from "lucide-react-native";
import { Colors, Spacing, BorderRadius, FontSize } from "@constants/theme";
import { useRouter } from "expo-router";

const HeaderStationHome = ({ searchText, setSearchText }: any) => {
  const router = useRouter();
  return (
    <View style={styles.headerContainer}>
      <View>
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={Colors.info[50]} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Trạm xe</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.searchContainer}>
          <Search
            size={20}
            color={Colors.secondary[800]}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm trạm xe..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor={Colors.secondary[800]}
          />
          <View style={styles.searchDivider} />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={Colors.secondary[800]} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HeaderStationHome;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.info[200],
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.md,
  },
  backButton: {
    padding: Spacing.xs,
  },
  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: BorderRadius.sm,
    height: 40,
    paddingHorizontal: Spacing.sm,
  },
  searchIcon: {
    marginRight: Spacing.xs,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.secondary[800],
    height: "100%",
  },
  searchDivider: {
    width: 1,
    height: 20,
    backgroundColor: Colors.primary[300],
    marginRight: Spacing.xs,
  },
  filterButton: {
    padding: Spacing.xs,
  },
});
