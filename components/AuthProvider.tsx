import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  sessionAtom,
  saveSessionToStorage,
  loadSessionFromStorage,
} from "@/atoms/sessionAtom";
import { supabase } from "@/lib/supabase";

const AuthProvider = () => {
  const [session, setSession] = useAtom(sessionAtom);

  useEffect(() => {
    // Restore session from storage
    loadSessionFromStorage(setSession);

    // Listen to auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        saveSessionToStorage(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [setSession]);

  return null; // No UI needed, just handling auth state
};

export default AuthProvider;
