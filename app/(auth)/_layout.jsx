import { Text, View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" backgroundColor="#161622" />
    </>
  );
};

export default AuthLayout;
