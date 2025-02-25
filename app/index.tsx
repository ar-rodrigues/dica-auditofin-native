import { Image, ScrollView, StatusBar, Text, View } from "react-native";
import React, { useEffect } from "react";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { logo } from "@/constants/Images";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { sessionAtom, checkSession } from "@/atoms/sessionAtom";

const index = () => {
  const [session, setSession] = useAtom(sessionAtom);
  useEffect(() => {
    checkSession(setSession);
  }, []);

  useEffect(() => {
    if (session) {
      router.push("/home");
    }
  }, [session]);
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="items-center justify-center w-full h-full px-4 bg-primary">
          <Image
            source={logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Text className="mt-4 text-5xl font-bold text-white">
            ¡Bienvenido!
          </Text>
          <Text className="mt-4 text-2xl text-center text-white">
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
