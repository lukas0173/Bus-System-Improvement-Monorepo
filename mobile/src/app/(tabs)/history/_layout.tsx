import { Stack } from "expo-router";

export default function HistoryStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Item.History"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
