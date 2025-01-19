import axios from "axios";

const axiosPublic = axios.create({
      baseURL: 'https://y-nine-inky.vercel.app', // Update to your backend URL
    });
    
    
const useAxiosPublic = () => {
      return axiosPublic;
};

export default useAxiosPublic;