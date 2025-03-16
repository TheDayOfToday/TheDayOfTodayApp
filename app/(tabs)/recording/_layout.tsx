import { Stack } from "expo-router";

export default function RecordLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index" 
        options={{ 
          headerShown: false,
        }} 
      />
      <Stack.Screen
        name="monologue"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="conversation"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="result"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="daily-analysis"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}