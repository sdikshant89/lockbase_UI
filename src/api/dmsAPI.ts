import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_DMS_API_BASE_URL || 'https://api.example.com',
  timeout: 10000,
});

export const getPasswords = async (username: string, id: number) => {
  const response = await apiClient.post('/list-passwords', { username, id });
  return response.data;
};
