import { create } from "zustand";

interface UserInfoT {
  id: string;
  email: string;
  name?: string;
}

interface AppStateT {
  // User State
  userInfo: UserInfoT | null;
  // Set the user info
  setUserInfo: (userInfo: UserInfoT) => void;
  // Reset the state
  resetState: () => void;
}

const useAppState = create<AppStateT>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo: UserInfoT) => set({ userInfo }),
  resetState: () => set({ userInfo: null }),
}));

export default useAppState;
