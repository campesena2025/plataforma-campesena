import { create } from "zustand";

import { getAllAsociaciones } from "@/services/asociaciones.service";
import { Asociaciones } from "@/types/asociacion";

interface AsociacionesState {
  asociaciones: Asociaciones | null;
  loading: boolean;
  error: unknown;
  fetchAsociaciones: () => Promise<void>;
  invalidate: () => void;
}

export const useAsociacionesStore = create<AsociacionesState>((set) => ({
  asociaciones: null,
  loading: false,
  error: null,
  fetchAsociaciones: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getAllAsociaciones();

      set({ asociaciones: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
  invalidate: () => set({ asociaciones: null }),
}));
