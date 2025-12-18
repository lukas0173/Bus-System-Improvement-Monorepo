import { Stack } from "expo-router";

export default function HomeStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Bus.Home.Screen"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="bus/[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}