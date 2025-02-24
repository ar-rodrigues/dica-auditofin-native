import { Image, ScrollView, StatusBar, Text, View } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { logo } from "@/constants/Images";
import { router } from "expo-router";

const index = () => {
  return (
    <SafeAreaView className="h-full  bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4 bg-primary">
          <Image
            source={logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Text className="text-white text-5xl font-bold mt-4">
            ¡Bienvenido!
          </Text>
          <Text className="text-white text-center text-2xl mt-4">
            Para comenzar, inicia sesión.
          </Text>
          <CustomButton
            text="Iniciar Sesión"
            isLoading={false}
            handlePress={() => router.push("/login")}
            containerStyle="w-full mt-7"
            textStyle="text-white"
          />
        </View>
      </ScrollView>
      <StatusBar translucent hidden backgroundColor={"#161622"} />
    </SafeAreaView>
  );
};

export default index;
