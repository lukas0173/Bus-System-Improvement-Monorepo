import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Colors } from "@constants/theme";

const EmailLogin = ({ email, setEmail }: { email: string; setEmail: any }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="abc@gmail.com"
        placeholderTextColor={Colors.secondary[800]}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
    </View>
  );
};

export default EmailLogin;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: Colors.secondary[400],
  },
  input: {
    width: "100%",
    height: 48,
    borderColor: Colors.secondary[800],
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 16,
    fontSize: 16,
  },
});
