import { TouchableOpacity, Text } from "react-native";
import React from "react";

const CustomButton = ({
  text,
  handlePress,
  isLoading,
  containerStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      className={`bg-secondary justify-center items-center rounded-xl min-h-[62px] ${containerStyle} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
      onPress={handlePress}
    >
      <Text className={`text-white font-bold text-lg ${textStyle}`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
