import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Departamento, Geografia, Municipio, Vereda } from "../types/geografia";

interface GeografiaState {
  geografia: Geografia | null;
  setGeografia: (geografia: Geografia) => void;
  getDepartamentos: () => Departamento[];
  getMunicipiosByDepartamento: (divipolaDepartamento: string) => Municipio[];
  getVeredasByMunicipio: (divipolaMunicipio: string) => Vereda[];
}

export const useGeografiaStore = create<GeografiaState>()(
  persist(
    (set, get) => ({
      geografia: null,
      setGeografia: (geografia) => set({ geografia }),
      getDepartamentos: () => {
        return get().geografia?.departamentos || [];
      },
      getMunicipiosByDepartamento: (divipolaDepartamento: string) => {
        const departamento = get().geografia?.departamentos.find(
          (dep) => dep.divipola === divipolaDepartamento,
        );

        return departamento?.municipios || [];
      },
      getVeredasByMunicipio: (divipolaMunicipio: string) => {
        let veredas: Vereda[] = [];

        get().geografia?.departamentos.forEach((departamento) => {
          const municipio = departamento.municipios.find(
            (mun) => mun.divipola === divipolaMunicipio,
          );

          if (municipio) {
            veredas = municipio.veredas;
          }
        });

        return veredas;
      },
    }),
    {
      name: "geografia-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
