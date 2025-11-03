import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Eye, EyeOff } from "lucide-react-native";
import { Colors } from "@constants/theme";

const PasswordLogin = ({
  password,
  setPassword,
  isPasswordShown,
  setIsPasswordShown,
}: any) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Mật khẩu</Text>
      <View style={styles.passwordInputWrapper}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Mật khẩu của bạn"
          placeholderTextColor={Colors.secondary[800]}
          secureTextEntry={!isPasswordShown}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordShown(!isPasswordShown)}
          style={styles.eyeIcon}
        >
          {isPasswordShown ? (
            <Eye size={24} color={Colors.secondary[800]} />
          ) : (
            <EyeOff size={24} color={Colors.secondary[800]} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordLogin;

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
  passwordInputWrapper: {
    width: "100%",
    height: 48,
    borderColor: Colors.secondary[800],
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  eyeIcon: {
    paddingHorizontal: 12,
  },
});
