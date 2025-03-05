import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function StatCard({ title, value, icon, iconColor }) {
  return (
    <View className="flex-1 p-2 mx-1 bg-white rounded-lg shadow">
      <View className="flex-row items-center justify-between mb-1">
        <Text className="text-sm font-semibold text-gray-600">{title}</Text>
        <Feather name={icon} size={16} color={iconColor} />
      </View>
      <Text className="text-xl font-bold text-gray-900">{value}</Text>
    </View>
  );
}
