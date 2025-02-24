import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#ddd",
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", width: 80 }}>
              <Entypo
                name="home"
                size={focused ? 24 : 22}
                color={focused ? "#007AFF" : "#888"}
              />
              <Text
                className={`text-xs mt-1 ${
                  focused ? "text-blue-500" : "text-gray-500"
                }`}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", width: 80 }}>
              <AntDesign
                name="piechart"
                size={focused ? 24 : 22}
                color={focused ? "#007AFF" : "#888"}
              />
              <Text
                className={`text-xs mt-1 ${
                  focused ? "text-blue-500" : "text-gray-500"
                }`}
              >
                Dashboard
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
