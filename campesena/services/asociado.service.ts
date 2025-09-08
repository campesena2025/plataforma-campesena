import { Participante } from "@/types/participante";
import { useAsociacionesStore } from "@/store/asociaciones.store";
import ApiClient from "@/app/api/axios/apiClient";

export const createAsociado = async (
  asociado: Omit<Participante, "id">,
  asociacionId: number,
) => {
  const { data: response } = await ApiClient.post("/participantes", {
    data: { ...asociado, asociacion: asociacionId },
  });

  // Una vez creado en el backend, actualizamos el estado en el frontend
  const newAsociado = response.data as Participante;

  useAsociacionesStore.getState().addAsociado(asociacionId, newAsociado);

  return response;
};

export const updateAsociado = async (
  asociacionId: number, // Se necesita para encontrar la asociación en el store
  asociado: Omit<Partial<Participante>, "id"> & { id: number },
) => {
  const { id, ...asociadoData } = asociado;
  const { data: response } = await ApiClient.put(`/participantes/${id}`, {
    data: asociadoData,
  });

  // Una vez actualizado en el backend, actualizamos el estado
  const updatedAsociado = response.data as Participante;

  useAsociacionesStore.getState().updateAsociado(asociacionId, updatedAsociado);

  return response;
};
