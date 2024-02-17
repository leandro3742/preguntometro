/* eslint-disable camelcase */
import { API_URL } from './constants';

export const login = async (user, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, password }),
    });
    if (response.ok) return response;
    throw new Error('Error al iniciar sesión');
  } catch (error) {
    return error;
  }
};

export const verifyToken = async (token) => {
  try {
    const response = await fetch(`${API_URL}/auth/verify`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
