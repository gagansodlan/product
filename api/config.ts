import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://endearpharma.com/shoestore/wp-json/wp-mobile-api/v1/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional helper to set token
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};
