import { AxiosResponse } from 'axios';

import ApiClient from '../app/api/axios/apiClient';
import { ModeloNegocio, ModeloNegocioRequest } from '../types/modeloNegocio';

export const getModeloNegocioByAsociacion = async (asociacionId: string): Promise<ModeloNegocio[]> => {
  const { data } = await ApiClient.get(
    `/modelo-negocios?filters[asociacion][documentId][$eq]=${asociacionId}&populate=*`,
  );

  return data.data;
};

export const getModeloNegocioById = async (id: number): Promise<AxiosResponse<{ data: ModeloNegocio }>> => {
  return await ApiClient.get(`/modelo-negocios/${id}?populate=*`);
};

export const createModeloNegocio = async (
  modelo: ModeloNegocioRequest,
): Promise<AxiosResponse<{ data: ModeloNegocio }>> => {
  return await ApiClient.post('/modelo-negocios', {
    data: modelo,
  });
};

export const updateModeloNegocio = async (
  id: string,
  modelo: Partial<ModeloNegocioRequest>,
): Promise<AxiosResponse<{ data: ModeloNegocio }>> => {
  return await ApiClient.put(`/modelo-negocios/${id}`, {
    data: modelo,
  });
};

export const getFirstModeloNegocioByAsociacion = async (asociacionId: string): Promise<ModeloNegocio | null> => {
  const modelos = await getModeloNegocioByAsociacion(asociacionId);
  return modelos.length > 0 ? modelos[0] : null;
};