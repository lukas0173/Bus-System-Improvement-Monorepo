import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Search } from "lucide-react-native";

import { Colors } from "@constants/theme";

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
});
