import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@constants/theme";
import HeaderLogin from "@components/register/Header.Register";
import EmailLogin from "@components/register/Email.Register";
import PasswordLogin from "@components/register/Password.Register";
import OptionsContainerLogin from "@components/register/OptionsContainer.Register";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View
      style={{
        ...styles.container,
        marginTop: insets.top,
        marginBottom: insets.bottom,
      }}
    >
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <HeaderLogin />

        <EmailLogin email={email} setEmail={setEmail} />
        <PasswordLogin
          label={"Mật khẩu"}
          placeholder={"Mật khẩu của bạn"}
          password={password}
          setPassword={setPassword}
          isPasswordShown={isPasswordShown}
          setIsPasswordShown={setIsPasswordShown}
        />
        <PasswordLogin
          label={"Nhập lại mật khẩu"}
          placeholder={"Nhập lại mật khẩu của bạn"}
          password={password}
          setPassword={setPassword}
          isPasswordShown={isPasswordShown}
          setIsPasswordShown={setIsPasswordShown}
        />

        <OptionsContainerLogin
          isChecked={isChecked}
          setIsChecked={setIsChecked}
        />

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Đăng ký</Text>
        </TouchableOpacity>

        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>Hoặc tiếp tục với</Text>
          <View style={styles.separatorLine} />
        </View>

        <View style={styles.socialLoginContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}>G</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}>f</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary[950],
  },
  content: {
    flex: 1,
    marginHorizontal: 22,
    justifyContent: "center",
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
  loginButton: {
    backgroundColor: Colors.info[400],
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  loginButtonText: {
    color: Colors.primary[950],
    fontSize: 18,
    fontWeight: "bold",
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.secondary[800],
  },
  separatorText: {
    marginHorizontal: 10,
    color: Colors.secondary[800],
    fontSize: 14,
  },
  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  socialButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 52,
    borderWidth: 1,
    borderColor: Colors.secondary[800],
    borderRadius: 10,
  },
  socialIcon: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.secondary[400],
  },
});
