import Axios from 'axios';
import {signOut} from 'next-auth/react';

const instance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    Accept: 'application/json',
  },
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response?.status === 401) {
      signOut();
    }
    return Promise.reject(error.response);
  }
);

export default instance;
