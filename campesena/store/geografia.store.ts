import { create } from "zustand";
interface GeografiaState {
  data: Departamento[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Importamos los datos directamente del archivo JSON y aseguramos el tipo
import geografiaData from "@/assets/meta/geografia.json";
import { Departamento } from "@/types/departamento";

// Los datos se cargan de forma síncrona y se establecen como el estado inicial.
export const useGeografiaStore = create<GeografiaState>(() => ({
  data: (geografiaData as { data: Departamento[] }).data,
  meta: {
    pagination: {
      page: 1,
      pageSize: 25,
      pageCount: 2,
      total: 33,
    },
  },
}));
