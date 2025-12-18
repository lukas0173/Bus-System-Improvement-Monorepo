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
        name="bus/Bus.Home.Screen"
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
      <Stack.Screen
        name="route/Route.Home.Screen"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="route/[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="station/Station.Home.Screen"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
