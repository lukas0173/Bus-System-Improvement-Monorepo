import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Search } from "lucide-react-native";
import { Colors, Spacing, BorderRadius } from "@constants/theme";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <Search
          style={styles.searchIcon}
          color={Colors.secondary[500]}
          size={20}
        />
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm địa điểm"
          placeholderTextColor={Colors.secondary[500]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    marginVertical: Spacing.md,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary[950],
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.secondary[800],
    paddingHorizontal: Spacing.md,
    height: 50,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.secondary[400],
  },
});

export default SearchBar;
