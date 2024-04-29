import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  user: string;
  isAuthorized: boolean;
};

type Actions = {
  setUser: (user: string, isAuthorized: boolean) => void;
};

export const useLoginStore = create(
  persist<State & Actions>(
    (set) => ({
      user: "",
      isAuthorized: false,
      setUser: (user: string, isAuthorized: boolean) =>
        set(() => ({
          user,
          isAuthorized,
        })),
    }),
    { name: "auth" }
  )
);
