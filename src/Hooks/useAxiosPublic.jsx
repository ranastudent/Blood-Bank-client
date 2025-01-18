import axios from "axios";

const axiosPublic = axios.create({
      baseURL: 'http://localhost:5000', // Update to your backend URL
    });
    
    
const useAxiosPublic = () => {
      return axiosPublic;
};

export default useAxiosPublic;