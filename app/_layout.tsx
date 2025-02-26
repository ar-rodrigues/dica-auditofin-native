import { View, Text } from "react-native";
import "@/global.css";
import React from "react";
import { Stack, Slot } from "expo-router";
import { Provider } from "jotai";
import AuthProvider from "@/components/AuthProvider";

const RootLayout = () => {
  return (
    <Provider>
      <AuthProvider />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
};

export default RootLayout;
