import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { View, Text, ScrollView, Image, AppState, Alert } from "react-native";
import { logo } from "@/constants/Images";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { saveSessionToStorage } from "../../atoms/sessionAtom";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);

  //console.log("session", session?.user.email);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session) {
      router.replace("/home");
    }
  }, [session]);

  async function signInWithEmail() {
    if (!email || !password) {
      Alert.alert("Missing Information", "Email and Password are required", [
        { text: "OK" },
      ]);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        Alert.alert("Login Error", error.message, [{ text: "OK" }]);
      } else {
        setSession(data.session); // Update session state
        saveSessionToStorage(data.session); // Save session to storage
      }
    } catch (error) {
      Alert.alert("Error", error.error_description || error.message, [
        { text: "OK" },
      ]);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="justify-center w-full h-full px-4 my-6 ">
          <View className="flex items-center justify-center">
            <Image
              source={logo}
              className="w-[130px] h-[84px]"
              resizeMode="contain"
            />
          </View>
          <FormField
            title="Email"
            value={email}
            handleChangeText={(e) => setEmail(e)}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={password}
            handleChangeText={(e) => setPassword(e)}
            otherStyles="mt-7 mb-7"
            keyboardType="password"
          />
          <CustomButton
            text="Acceder"
            handlePress={signInWithEmail}
            containerStyles={`mt-7`}
            isLoading={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
