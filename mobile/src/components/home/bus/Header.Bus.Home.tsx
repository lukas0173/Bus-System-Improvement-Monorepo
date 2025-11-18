import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Search, Filter } from "lucide-react-native";
import { Colors, Spacing, BorderRadius, FontSize } from "@constants/theme";

const HeaderBusHome = ({ searchText, setSearchText }: any) => {
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.headerTitle}>Xe Buýt</Text>

        <View style={styles.searchContainer}>
          <Search
            size={20}
            color={Colors.secondary[800]}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm..."
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

export default HeaderBusHome;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.info[200],
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: Spacing.md,
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
