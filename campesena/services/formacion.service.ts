import qs from 'qs';

import ApiClient from '@/app/api/axios/apiClient';
import { Formacion, Formacions } from '@/types/formacion';

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

export const getFormacionesInscritas = async (asociacionId: string): Promise<Formacions> => {
  const query = qs.stringify(
    {
      filters: {
        asociacion: {
          id: {
            $eq: asociacionId,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
  const response = await ApiClient.get<Formacions>(`/formacions?${query}`);

  return response.data;
};

export const inscribirFormacion = async (asociacionId: string, formacion: Partial<Formacion>): Promise<Formacion> => {
  const { data: response } = await ApiClient.post('/formacions', {
    data: {
      asociacion: asociacionId,
      ...formacion,
      estado: true,
    },
  });

  return response.data;
};

export const desasignarFormacionAsociacion = async (formacionAsociacionId: number) => {
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
