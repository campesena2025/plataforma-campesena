import qs from "qs";

import api, { withAuth } from "./api/axios-interceptor";

import {
  Asociacion,
  Asociaciones,
  AsociacionRequest,
} from "@/types/asociacion";

export const getAllAsociaciones = async (): Promise<Asociaciones> => {
  const query = qs.stringify(
    {
      populate: ["participante"],
      pagination: {
        page: 1,
        pageSize: 50,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const response = await api.get(`/asociacions?${query}`, withAuth());

  return response.data;
};

export const getAsociacionById = async (id: string): Promise<Asociacion> => {
  const response = await api.get(`/asociacions/${id}`, withAuth());

  return response.data;
};

export const createAsociacion = async (data: AsociacionRequest) => {
  const strapiData: AsociacionRequest = {
    ...data,
  };
  const response = await api.post(
    "/asociacions",
    { data: strapiData },
    withAuth(),
  );

  return response.data;
};

export const updateAsociacion = async (id: string, data: AsociacionRequest) => {
  const strapiData: AsociacionRequest = {
    ...data,
  };
  const response = await api.put(
    `/asociacions/${id}`,
    { data: strapiData },
    withAuth(),
  );

  return response.data;
};
