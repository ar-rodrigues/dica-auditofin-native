import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";

const FormField = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  keyboardType,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // Add focus state
  const placeholder = `Enter ${title}`;

  return (
    <View className={`w-full space-y-2 ${otherStyles}`}>
      <Text className="pb-2 pl-2 text-base font-medium text-gray-100">
        {title}
      </Text>
      <View
        className={`flex-row items-center w-full h-16 px-4 border-2 ${
          isFocused ? "border-white" : "border-secondary"
        } bg-black-100 rounded-2xl`}
      >
        <TextInput
          className="flex-1 text-base text-white font-poppins"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          keyboardType={keyboardType}
          secureTextEntry={title === "Password" && !showPassword}
          onFocus={() => setIsFocused(true)} // Handle focus
          onBlur={() => setIsFocused(false)} // Handle blur
          {...props}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {!showPassword ? (
              <Entypo name="eye" size={20} color="white" />
            ) : (
              <Entypo name="eye-with-line" size={20} color="white" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
