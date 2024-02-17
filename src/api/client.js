/* eslint-disable no-unused-vars */
import { API_URL } from './constants';

export const createClient = async (client) => {
  try {
    const response = await fetch(`${API_URL}/client`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(client),
    });
    if (response.ok) return response;
    throw new Error('Error al crear el usuario');
  } catch (error) {
    return error;
  }
};

export const saveResults = async (results) => {
  try {
    const response = await fetch(`${API_URL}/result`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ resultado: results }),
    });
    if (response.ok) return response;
    throw new Error('Error al guardar los resultados');
  } catch (error) {
    return error;
  }
};

export const getClients = async () => {
  try {
    const response = await fetch(`${API_URL}/client`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      },
    });
    if (response.ok) return response;
    throw new Error('Error al obtener los usuarios');
  } catch (error) {
    return error;
  }
};

export const getResults = async (ci) => {
  try {
    const response = await fetch(`${API_URL}/result/${ci}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      },
    });
    if (response.ok) return response;
    throw new Error('Error al obtener los resultados');
  } catch (error) {
    return error;
  }
};

export const deleteClient = async (ci) => {
  try {
    const response = await fetch(`${API_URL}/client/${ci}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
