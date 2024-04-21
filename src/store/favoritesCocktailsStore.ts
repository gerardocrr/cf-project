import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  ids: number[];
};

type Actions = {
  handleId: (id: number) => void;
};

export const useFavoritesStore = create(
  persist<State & Actions>(
    (set) => ({
      ids: [],
      handleId: (id: number) =>
        set((state) => {
          const index = state.ids.indexOf(id);
          if (index !== -1) {
            // Si el ID ya existe, lo eliminamos
            const updatedIds = [...state.ids];
            updatedIds.splice(index, 1);
            return { ids: updatedIds };
          } else {
            // Si el ID no existe, lo agregamos
            return { ids: [...state.ids, id] };
          }
        }),
    }),
    { name: "ids" }
  )
);
