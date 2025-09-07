import { create } from "zustand";

import { Asociacion } from "@/types/asociacion";
import { Participante } from "@/types/participante";
import { getAllAsociaciones } from "@/services/asociaciones.service";

interface AsociacionesState {
  data: Asociacion[];
  loading: boolean;
  fetchAsociaciones: () => Promise<void>;
  invalidate: () => Promise<void>;
  addAsociado: (asociacionId: number, newAsociado: Participante) => void;
  updateAsociado: (
    asociacionId: number,
    updatedAsociado: Partial<Participante> & { id: number },
  ) => void;
}

export const useAsociacionesStore = create<AsociacionesState>((set, get) => ({
  data: [],
  loading: false,

  fetchAsociaciones: async () => {
    // Evita recargas si ya tenemos datos
    if (get().data.length > 0) return;
    set({ loading: true });
    try {
      const asociaciones = await getAllAsociaciones();

      set({ data: asociaciones.data, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  invalidate: async () => {
    set({ loading: true });
    try {
      const asociaciones = await getAllAsociaciones();

      set({ data: asociaciones.data, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  addAsociado: (asociacionId, newAsociado) => {
    set((state) => ({
      data: state.data.map((asociacion) => {
        if (asociacion.id !== asociacionId) {
          return asociacion;
        }

        return {
          ...asociacion,
          participantes: [...(asociacion.participantes || []), newAsociado],
        };
      }),
    }));
  },

  updateAsociado: (asociacionId, updatedAsociado) => {
    set((state) => ({
      data: state.data.map((asociacion) => {
        if (asociacion.id !== asociacionId) {
          return asociacion;
        }

        return {
          ...asociacion,
          participantes: (asociacion.participantes || []).map((p) =>
            p.id === updatedAsociado.id ? { ...p, ...updatedAsociado } : p,
          ),
        };
      }),
    }));
  },
}));
