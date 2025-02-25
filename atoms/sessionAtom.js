import { atom } from "jotai";
import { supabase } from "../lib/supabase";

// Define an atom to hold the session state
export const sessionAtom = atom(null);

// Define a function to check the session and update the atom
export const checkSession = async (setSession) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  setSession(session);
  supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session);
  });
};
