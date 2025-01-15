import { initializeApp } from "firebase/app";
import districtsData from "../assets/districts.json";
import upazilas from "../assets/upazilas.json"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// const firebaseConfig = {
//   apiKey: "AIzaSyDNVpCeSUqsHAth73dY7KxbB8857gNMZoM",
//   authDomain: "blood-donation-client-d128e.firebaseapp.com",
//   projectId: "blood-donation-client-d128e",
//   storageBucket: "blood-donation-client-d128e.firebasestorage.app",
//   messagingSenderId: "504314339494",
//   appId: "1:504314339494:web:ac9f31698c19e551791467"
// };
