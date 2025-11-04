import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack initialRouteName="(tabs)">
      <Stack.Screen name="login/index" options={{ headerShown: false }} />
      <Stack.Screen name="register/index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
