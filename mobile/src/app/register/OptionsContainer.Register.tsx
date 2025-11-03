import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import { Colors } from "@constants/theme";

const OptionsContainerLogin = ({ isChecked, setIsChecked }: any) => {
  return (
    <View style={styles.optionsContainer}>
      <View style={styles.checkboxContainer}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setIsChecked}
          color={isChecked ? Colors.info[300] : undefined}
        />
        <Text style={styles.checkboxLabel}>Lưu thông tin</Text>
      </View>
    </View>
  );
};

export default OptionsContainerLogin;

const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  link: {
    color: Colors.info[300],
  },
});
