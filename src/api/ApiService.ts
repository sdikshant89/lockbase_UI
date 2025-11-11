import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_IAM_API_BASE_URL || 'https://api.example.com',
  timeout: 10000,
});

export const loginUser = async (email: string, password: string) => {
  const response = await apiClient.post('/register/login_user', {
    email,
    password,
  });
  return response.data;
};

export const getUserProfile = async (token: string) => {
  const response = await apiClient.get('/user/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // Assuming a User object in the response
};

export const updateUserProfile = async (token: string, updates: object) => {
  const response = await apiClient.put('/user/profile', updates, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const registerUser = async (
  email: string,
  password: string,
  username: string
) => {
  const response = await apiClient.post('/auth/register', {
    email,
    password,
    username,
  });
  return response.data;
};
