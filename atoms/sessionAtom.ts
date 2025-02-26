import { atom } from "jotai";
import { Session } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const sessionAtom = atom<Session | null>(null);

// Load session from storage
export async function loadSessionFromStorage(
  setSession: (session: Session | null) => void
) {
  const sessionString = await AsyncStorage.getItem("session");
  if (sessionString) {
    const session = JSON.parse(sessionString);
    setSession(session);
  }
}

// Save session to storage
export async function saveSessionToStorage(session: Session | null) {
  if (session) {
    await AsyncStorage.setItem("session", JSON.stringify(session));
  } else {
    await AsyncStorage.removeItem("session");
  }
}
