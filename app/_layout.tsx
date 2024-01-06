import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="[id]"
        options={{ headerTitle: 'Restaurant Details', headerShown: true }}
      />
    </Stack>
  );
}
