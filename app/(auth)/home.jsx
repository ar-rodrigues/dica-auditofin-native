import { useEffect } from "react";
import { View, Text } from "react-native";
import { useAtom } from "jotai";
import { sessionAtom } from "@/atoms/sessionAtom";
import { router } from "expo-router";

const Home = () => {
  const [session] = useAtom(sessionAtom);

  useEffect(() => {
    if (!session) {
      router.push("login");
    }
  }, [session]);

  return (
    <View>
      <Text>Welcome to the Home Page</Text>
    </View>
  );
};

export default Home;
