import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: number;
  nama: string;
  username: string;
  role: string;
  id_outlet?: number | null;
}

interface AuthState {
  user: User | null;
  token: string | null;

  setLogin: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      setLogin: (user, token) =>
        set({
          user,
          token,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);
