import { create } from "zustand";
import Supabase from "./lib/supabase";

interface UserInfoT {
  id: string;
  email: string;
}

interface AppStateT {
  // User State
  userInfo: UserInfoT | null;
  // Set the user info
  setUserInfo: (userInfo: UserInfoT) => void;
  // Reset the state
  resetState: () => void;
  // Load user from Supabase Auth and set in the store
  loadUserFromSupabase: () => Promise<void>;
}

const useAppState = create<AppStateT>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo: UserInfoT) => set({ userInfo }),
  resetState: () => set({ userInfo: null }),
  loadUserFromSupabase: async () => {
    const {
      data: { user },
      error,
    } = await Supabase.auth.getUser();

    if (error) {
      console.error("Erreur lors de la récupération user Supabase :", error);
      set({ userInfo: null });
      return;
    }

    if (user) {
      set({
        userInfo: {
          id: user.id,
          email: user.email || "",
        },
      });
    } else {
      set({ userInfo: null });
    }
  },
}));

export default useAppState;
