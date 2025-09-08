import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { Asociacion } from "@/types/asociacion";
import { Participante } from "@/types/participante";
import { getAllAsociaciones } from "@/services/asociaciones.service";

interface AsociacionesState {
  data: Asociacion[];
  loading: boolean;
  fetchAsociaciones: () => Promise<void>;
  invalidate: () => Promise<void>;
  addAsociacion: (newAsociacion: Asociacion) => void;
  updateAsociacion: (
    asociacionId: string,
    updatedFields: Partial<Asociacion>,
  ) => void;
  addAsociado: (asociacionId: number, newAsociado: Participante) => void;
  updateAsociado: (
    asociacionId: number,
    updatedAsociado: Partial<Participante> & { id: number },
  ) => void;
  reset: () => void;
}

const initialState = {
  data: [],
  loading: false,
};

export const useAsociacionesStore = create(
  devtools(
    immer<AsociacionesState>((set, get) => ({
      ...initialState,

      fetchAsociaciones: async () => {
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

      addAsociacion: (newAsociacion) => {
        set((state) => {
          state.data.push(newAsociacion);
        });
      },

      updateAsociacion: (asociacionId, updatedFields) => {
        set((state) => {
          const asociacion = state.data.find(
            (a) => a.documentId === asociacionId,
          );
          if (asociacion) {
            Object.assign(asociacion, updatedFields);
          }
        });
      },

      addAsociado: (asociacionId, newAsociado) => {
        set((state) => {
          const asociacion = state.data.find((a) => a.id === asociacionId);
          if (asociacion) {
            if (asociacion.participantes) {
              asociacion.participantes.push(newAsociado);
            } else {
              asociacion.participantes = [newAsociado];
            }
          }
        });
      },

      updateAsociado: (asociacionId, updatedAsociado) => {
        set((state) => {
          const asociacion = state.data.find((a) => a.id === asociacionId);
          if (asociacion && asociacion.participantes) {
            const participanteIndex = asociacion.participantes.findIndex(
              (p) => p.id === updatedAsociado.id,
            );
            if (participanteIndex !== -1) {
              asociacion.participantes[participanteIndex] = {
                ...asociacion.participantes[participanteIndex],
                ...updatedAsociado,
              };
            }
          }
        });
      },
      reset: () => {
        set(initialState);
      },
    })),
    {
      name: "asociaciones-store",
    },
  ),
);