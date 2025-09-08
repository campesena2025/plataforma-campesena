import { Participante, ParticipanteRequest } from "@/types/participante";
import { useAsociacionesStore } from "@/store/asociaciones.store";
import ApiClient from "@/app/api/axios/apiClient";

export const createAsociado = async (
  asociado: Omit<ParticipanteRequest, "id">,
  asociacionId: number,
) => {
  const { data: response } = await ApiClient.post("/participantes", {
    data: { ...asociado, asociacions: [asociacionId] },
  });

  // Una vez creado en el backend, actualizamos el estado en el frontend
  const newAsociado = response.data as Participante;

  useAsociacionesStore.getState().addAsociado(asociacionId, newAsociado);

  return response;
};

export const updateAsociado = async (
  asociacionId: number,
  asociado: ParticipanteRequest,
) => {
  const { documentId, ...rest } = asociado;
  const { data: response } = await ApiClient.put(
    `/participantes/${documentId}`,
    {
      data: rest,
    },
  );

  // Una vez actualizado en el backend, actualizamos el estado
  const updatedAsociado = response.data as Participante;

  useAsociacionesStore.getState().updateAsociado(asociacionId, updatedAsociado);

  return response;
};
