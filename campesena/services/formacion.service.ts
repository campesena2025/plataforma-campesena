import qs from 'qs';

import ApiClient from '@/app/api/axios/apiClient';
import { Formacion, Formacions } from '@/types/formacion';
import { FormacionAsociacion, FormacionAsociacions } from '@/types/formacionAsociacion';

export const getFormacionesDisponibles = async (
  searchTerm: string = '',
  page: number = 1,
  pageSize: number = 10,
  sort: string = 'nombre:asc',
): Promise<Formacions> => {
  const query = qs.stringify(
    {
      pagination: {
        page,
        pageSize,
      },
      sort,
      filters: searchTerm
        ? {
            $or: [
              { nombre: { $containsi: searchTerm } },
              { codigoSofia: { $containsi: searchTerm } },
              { version: { $containsi: searchTerm } },
            ],
          }
        : undefined,
    },
    {
      encodeValuesOnly: true,
    },
  );
  const response = await ApiClient.get<Formacions>(`/formacions?${query}`);

  return response.data;
};

export const getFormacionesInscritas = async (asociacionId: number): Promise<FormacionAsociacions> => {
  const query = qs.stringify(
    {
      filters: {
        asociacion: {
          $eq: asociacionId,
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
  const response = await ApiClient.get<FormacionAsociacions>(`/formacion-asociacions?${query}`);

  return response.data;
};

export const inscribirFormacion = async (
  asociacionId: string,
  datos: {
    nombreFormacion: string;
    version: string;
    codigoSofia: string;
    numeroFicha: string;
  },
): Promise<FormacionAsociacion> => {
  const { data: response } = await ApiClient.post('/formacion-asociacions', {
    data: {
      ...datos,
      asociacion: asociacionId,
    },
  });

  return response.data;
};

export const desasignarFormacionAsociacion = async (formacionAsociacionId: string) => {
  const { data: response } = await ApiClient.delete(`/formacion-asociacions/${formacionAsociacionId}`);

  return response;
};

export const actualizarEstadoFormacion = async (formacionId: string, estado: boolean): Promise<Formacion> => {
  const { data: response } = await ApiClient.put(`/formacions/${formacionId}`, {
    data: {
      estado,
    },
  });

  return response.data;
};

export const getDetalleFormacion = async (formacionId: string): Promise<Formacion> => {
  const response = await ApiClient.get<{ data: Formacion }>(`/formacions/${formacionId}`);

  return response.data.data;
};

// No se menciona reasignar en el componente, se puede implementar luego si es necesario.
