import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAxiosSecure = () => {
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000', // Replace with your API base URL
  });

  useEffect(() => {
    // Request interceptor to include the token in the headers
    axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle token expiration
    axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Token is invalid or expired
          localStorage.removeItem('access_token'); // Clear the token
          navigate('/login', { replace: true }); // Redirect to the login page
        }
        return Promise.reject(error);
      }
    );
  }, [navigate, axiosSecure]);

  return axiosSecure;
};

export default useAxiosSecure;
