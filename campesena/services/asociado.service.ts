import api, { withAuth } from "./api/axios-interceptor";

import { Participante, ParticipanteRequest } from "@/types/participante";
import { ParticipanteAsociacionRequest } from "@/types/participanteAsociacion";

export const createAsociado = async (
  participanteData: Omit<ParticipanteRequest, "tipoParticipante">,
  asociacionId: string,
): Promise<Participante> => {
  const fullParticipanteData: ParticipanteRequest = {
    ...participanteData,
    tipoParticipante: "Miembro", // Assuming 'Miembro' for new associates
  };

  const {
    data: { data: newParticipante },
  } = await api.post(
    `/participantes`,
    { data: fullParticipanteData },
    withAuth(),
  );

  // This part creates the link between the new associate and the association.
  // It might need more fields depending on the backend configuration.
  const participanteAsociacionData: Partial<ParticipanteAsociacionRequest> = {
    participante: newParticipante.id,
    asociacion: asociacionId,
    rolAsociacion: "Miembro", // Assuming 'Miembro'
  };

  await api.post(
    `/participante-asociacions`,
    { data: participanteAsociacionData },
    withAuth(),
  );

  return newParticipante;
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
