import React from "react";
import { View, Text } from "react-native";
import StatusBadge from "./StatusBadge";

export default function RequirementItem({ requirement }) {
  return (
    <View className="flex-row items-center px-4 py-4 border-b border-gray-100">
      <Text className="w-12 font-medium text-gray-900">{requirement.id}</Text>
      <View className="flex-1 mr-2">
        <Text className="mb-1 text-gray-800">{requirement.name}</Text>
        <Text className="text-xs text-gray-500">
          Formato: {requirement.format}
        </Text>
      </View>
      <View className="w-24">
        <StatusBadge delivered={requirement.delivered} />
      </View>
    </View>
  );
}
