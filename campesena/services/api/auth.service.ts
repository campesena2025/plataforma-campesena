import qs from 'qs';

import { saveSession } from '../auth';

import api, { withAuth } from './axios-interceptor';

import ApiClientOpen from '@/app/api/axios/apiClientOpen';
import { useAsociacionesStore } from '@/store/asociaciones.store';
import { User } from '@/types/user';

export interface LoginResponse {
  jwt: string;
  user: User;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const query = qs.stringify(
      {
        populate: [
          'role',
          'asociacions',
          'asociacions.departamento',
          'asociacions.municipio',
          'asociacions.vereda',
          'asociacions.participantes',
          'asociacions.representanteLegal',
          'asociacions.foto',
        ],
        sort: ['asociacions.nombreAsociacion:asc'],
      },
      {
        encodeValuesOnly: true,
      },
    );

    const response = await ApiClientOpen.post('/api/auth/local', {
      identifier: email,
      password,
    });

    const loginResponse = response.data as LoginResponse;

    saveSession(loginResponse);

    const populatedUserResponse = await api.get(`/users/me?${query}`, withAuth());

    loginResponse.user = populatedUserResponse.data;
    saveSession(loginResponse); // Update session with populated user

    const setAsociaciones = useAsociacionesStore.getState().setAsociaciones;

    if (loginResponse.user.asociacions) {
      setAsociaciones(loginResponse.user.asociacions);
    }

    return loginResponse;
  } catch (error: any) {
    throw error;
  }
}
