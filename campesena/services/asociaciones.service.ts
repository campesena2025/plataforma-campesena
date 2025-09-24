import qs from "qs";

import { getSession } from "./auth";

import {
  Asociacion,
  AsociacionRequest,
  toAsociacionRequest,
} from "@/types/asociacion";
import { useAsociacionesStore } from "@/store/asociaciones.store";
import ApiClient from "@/app/api/axios/apiClient";

export const getAllAsociaciones = async () => {
  const query = qs.stringify(
    {
      populate: [
        "departamento",
        "municipio",
        "vereda",
        "participantes",
        "representanteLegal",
        "foto",
      ],
      pagination: {
        page: 1,
        pageSize: 50,
      },
      sort: ["nombreAsociacion:asc"],
    },
    {
      encodeValuesOnly: true,
    },
  );

  const response = await ApiClient.get(`/asociacions?${query}`);

  return response.data;
};

export const getAsociacionById = async (id: string) => {
  const query = qs.stringify(
    {
      populate: [
        "departamento",
        "municipio",
        "vereda",
        "participantes",
        "representanteLegal",
        "foto",
      ],
    },
    {
      encodeValuesOnly: true,
    },
  );
  const response = await ApiClient.get(`/asociacions/${id}?${query}`);

  return response.data.data;
};

export const createAsociacion = async (
  asociacion: Omit<AsociacionRequest, "id">,
) => {
  const query = qs.stringify(
    {
      populate: [
        "departamento",
        "municipio",
        "vereda",
        "participantes",
        "representanteLegal",
        "foto",
      ],
    },
    {
      encodeValuesOnly: true,
    },
  );

  asociacion.estado = "Registrada";
  asociacion.users_permissions_user = getSession()?.user.id ?? 0;

  const { data: response } = await ApiClient.post(`/asociacions?${query}`, {
    data: asociacion,
  });

  // Actualizar el estado global con la nueva asociación
  const newAsociacion = response.data as Asociacion;

  useAsociacionesStore.getState().addAsociacion(newAsociacion);

  return response;
};

export const updateAsociacion = async (
  id: string,
  asociacion: AsociacionRequest,
) => {
  const { ...asociacionData } = asociacion;

  const query = qs.stringify(
    {
      populate: [
        "departamento",
        "municipio",
        "vereda",
        "participantes",
        "representanteLegal",
        "foto",
      ],
    },
    {
      encodeValuesOnly: true,
    },
  );

  const { data: response } = await ApiClient.put(
    `/asociacions/${id}?${query}`,
    {
      data: asociacionData,
    },
  );

  // Actualizar el estado global con los cambios
  const updatedAsociacion = response.data as Asociacion;

  useAsociacionesStore.getState().updateAsociacion(id, updatedAsociacion);

  return response;
};

export const setRepresentanteLegalId = async (
  asociacionId: string,
  participanteId: number,
) => {
  // Obtener la asociación actual
  const asociacion = useAsociacionesStore
    .getState()
    .data.find((a) => a.documentId === asociacionId);

  if (!asociacion) {
    throw new Error("Asociación no encontrada");
  }
  const asociacionRequest = toAsociacionRequest(asociacion);

  asociacionRequest.representanteLegal = participanteId;
  await updateAsociacion(asociacionId, asociacionRequest);
};
