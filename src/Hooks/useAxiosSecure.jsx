import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';  // Make sure this path is correct

const useAxiosSecure = () => {
  const { logOut } = useAuth();  // Destructure logOut from your auth context
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: 'https://y-nine-inky.vercel.app',  // Update to your API's base URL
  });

  useEffect(() => {
    // Request Interceptor
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

    // Response Interceptor
    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          // Unauthorized or Forbidden response
          localStorage.removeItem('access_token');  // Clear the token
          await logOut();  // Ensure logout function is called to clear the user session
          alert('Session expired or unauthorized access. Please log in again.');
          navigate('/login', { replace: true });  // Redirect to login
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
