import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Auth from "../../components/Auth";
import { View, Text } from "react-native"; // Added Text import
import { Session } from "@supabase/supabase-js";

const Login = () => {
  const [session, setSession] = useState(null); // Corrected useState syntax

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log(session);
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View>
      {!session && session.user ? <Text>{session.email}</Text> : <Auth />}
    </View>
  );
};

export default Login;
