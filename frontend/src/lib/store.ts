interface AuthUser {
  id: string;
  email: string;
  username:string;
}

interface AuthStore {
  isLoggedIn: boolean;
  isLoading: boolean;
  authUser: AuthUser | null;

  setAuthUser: (user: AuthUser | null) => void;
  setIsLoggedIn: (val: boolean) => void;
  setIsLoading: (val: boolean) => void;
  checkAuth: () => Promise<void>;
}

import { create } from "zustand";
import { apiInstance } from ".";

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  isLoading: true,
  authUser: null,

  setAuthUser: (user) => set({ authUser: user }),

  setIsLoggedIn: (val) => set({ isLoggedIn: val }),

  setIsLoading: (val) => set({ isLoading: val }),

  checkAuth: async () => {
    try {
      const res = await apiInstance.get("/auth/check");
      set({ authUser: res.data, isLoggedIn: true });
    } catch (error: any) {
      console.log(error?.response?.data?.message || "Session check failed");
      set({ authUser: null, isLoggedIn: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));

