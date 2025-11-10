import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Search } from "lucide-react-native";

import { Colors, Spacing, FontSize, BorderRadius } from "@constants/theme";

const SearchBarHome = () => (
  <View style={styles.searchContainer}>
    <Text style={styles.searchLabel}>Tìm kiếm địa điểm</Text>
    <View style={styles.searchInputWrapper}>
      <Search
        color={Colors.secondary[700]}
        size={20}
        style={styles.searchIcon}
      />
      <TextInput
        placeholder="Tìm kiếm"
        style={styles.searchInput}
        placeholderTextColor={Colors.secondary[700]}
      />
    </View>
  </View>
);

export default SearchBarHome;

const styles = StyleSheet.create({
  searchContainer: {
    marginVertical: Spacing.sm,
  },
  searchLabel: {
    fontSize: FontSize.md,
    fontWeight: "600",
    color: Colors.secondary[500],
    marginBottom: Spacing.xs,
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    height: 50,
    paddingHorizontal: Spacing.sm,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize.sm,
  },
});
