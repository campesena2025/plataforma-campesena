import Cookies from 'js-cookie';

import { LoginResponse } from './api/auth.service';

import { resetAllStores } from '@/store/reset';

export const saveSession = (response: LoginResponse) => {
  Cookies.set('session-token', response.jwt);
  localStorage.setItem('jwt', response.jwt);
  localStorage.setItem('user', JSON.stringify(response.user));
  window.dispatchEvent(new Event('storage'));
};

export const clearSession = () => {
  Cookies.remove('session-token');
  localStorage.removeItem('jwt');
  localStorage.removeItem('user');
  window.dispatchEvent(new Event('storage'));
  resetAllStores();
};

export const getSession = (): LoginResponse | null => {
  const jwt = localStorage.getItem('jwt');
  const user = localStorage.getItem('user');

  if (jwt && user) {
    return {
      jwt,
      user: JSON.parse(user),
    };
  }

  return null;
};

export const getJwt = (): string | null => {
  return localStorage.getItem('jwt');
};
