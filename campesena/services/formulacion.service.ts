import { AxiosResponse } from 'axios';

import ApiClient from '../app/api/axios/apiClient';
import { ProyectoProductivo, ProyectoProductivoRequest, ProyectoProductivos } from '../types/proyectoProductivo';

export const getProyectoProductivoByAsociacion = async (asociacionId: string): Promise<ProyectoProductivos> => {
  const { data } = await ApiClient.get(
    `/proyecto-productivos?filters[asociacion][documentId][$eq]=${asociacionId}&populate=*`,
  );

  return data;
};

export const getProyectoProductivoById = async (id: number): Promise<AxiosResponse<{ data: ProyectoProductivo }>> => {
  return await ApiClient.get(`/proyecto-productivos/${id}?populate=*`);
};

export const createProyectoProductivo = async (
  proyecto: ProyectoProductivoRequest,
): Promise<AxiosResponse<{ data: ProyectoProductivo }>> => {
  return await ApiClient.post('/proyecto-productivos', {
    data: proyecto,
  });
};

export const updateProyectoProductivo = async (
  id: string,
  proyecto: Partial<ProyectoProductivoRequest>,
): Promise<AxiosResponse<{ data: ProyectoProductivo }>> => {
  return await ApiClient.put(`/proyecto-productivos/${id}`, {
    data: proyecto,
  });
};

export const deleteProyectoProductivo = async (id: number): Promise<AxiosResponse> => {
  return await ApiClient.delete(`/proyecto-productivos/${id}`);
};
