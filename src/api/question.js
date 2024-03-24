import { API_URL } from './constants';

export const getQuestions = async () => {
  try {
    const response = await fetch(`${API_URL}/answer`, {
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

export const saveResults = async (results) => {
  try {
    const response = await fetch(`${API_URL}/answer/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(results),
    });
    if (response.ok) return response;
    throw new Error('Error al obtener los usuarios');
  } catch (error) {
    return error;
  }
};
