import React from "react";
import { View, Text } from "react-native";

export default function StatusBadge({ delivered }) {
  const backgroundColor = delivered ? "#D1FAE5" : "#FEE2E2"; // green for delivered, red for missing
  const textColor = delivered ? "#065F46" : "#991B1B";
  const text = delivered ? "Entregado" : "Faltante";

  return (
    <View
      style={{
        backgroundColor,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: "flex-start",
      }}
    >
      <Text style={{ fontSize: 12, fontWeight: "500", color: textColor }}>
        {text}
      </Text>
    </View>
  );
}
