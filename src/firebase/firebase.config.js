
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};
// const firebaseConfig = {
//   apiKey: "AIzaSyAL_zqbTNV-tPdIxm0pBbpTrq5oIrvXPlE",
//   authDomain: "tourism-management-syste-e2926.firebaseapp.com",
//   projectId: "tourism-management-syste-e2926",
//   storageBucket: "tourism-management-syste-e2926.firebasestorage.app",
//   messagingSenderId: "406250580693",
//   appId: "1:406250580693:web:dffe8f4eb151bfb4c2105c"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);