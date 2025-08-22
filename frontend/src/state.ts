import { create } from "zustand";

interface UserInfoT {
  id: string;
  email: string;
  name?: string;
}

interface AppStateT {
  userInfo: UserInfoT | null;
  setUserInfo: (userInfo: UserInfoT) => void;
  updateName: (name: string) => void;
  resetState: () => void;
}

const useAppState = create<AppStateT>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo: UserInfoT) => set({ userInfo }),
  updateName: (name) =>
    set((state) => ({
      userInfo: state.userInfo ? { ...state.userInfo, name } : null,
    })),
  resetState: () => set({ userInfo: null }),
}));

export default useAppState;
