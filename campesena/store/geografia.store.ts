import { create } from "zustand";

interface GeografiaState {
  data: Departamento[];
}

import geografiaData from "@/assets/meta/geografia.json";
import { Departamento } from "@/types";

export const useGeografiaStore = create<GeografiaState>(() => ({
  data: geografiaData as unknown as Departamento[],
}));
