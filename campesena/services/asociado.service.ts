import api, { withAuth } from "./api/axios-interceptor";

import { Participante, ParticipanteRequest } from "@/types/participante";

export const createAsociado = async (
  participanteData: ParticipanteRequest,
  asociacionId: number,
): Promise<Participante> => {
  try {
    const fullParticipanteData: ParticipanteRequest = {
      ...participanteData,
      asociacions: [asociacionId],
    };

    const {
      data: { data: newParticipante },
    } = await api.post(
      `/participantes`,
      { data: fullParticipanteData },
      withAuth(),
    );

    return newParticipante;
  } catch (error) {
    console.error("Error creating asociado:", error);
    throw error;
  }
};

export const updateAsociado = async (
  id: number,
  data: Partial<ParticipanteRequest>,
): Promise<Participante> => {
  const {
    data: { data: updatedParticipante },
  } = await api.put(`/participantes/${id}`, { data }, withAuth());

  return updatedParticipante;
};
