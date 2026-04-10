import { Stack } from 'expo-router';

function EditPwdLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}

export default EditPwdLayout;
