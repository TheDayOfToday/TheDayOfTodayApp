import { Stack } from "expo-router";

function SettingLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  )
}

export default SettingLayout;
