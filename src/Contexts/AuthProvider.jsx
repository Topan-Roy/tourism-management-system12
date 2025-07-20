
import { useEffect, useState } from "react";

import {
 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../Firebase/Firebase.config";
import { AuthContext } from "./AuthContext";
import axios from "axios";



const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const singIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
   const forgetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
      };

  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      setUser(loggedUser);
      setLoading(false);

      if (loggedUser) {
        // Fetch JWT token from backend
        axios
          .post("http://localhost:5000/jwt", { email: loggedUser.email })
          .then((res) => {
            localStorage.setItem("access-token", res.data.token);
          });
      } else {
        localStorage.removeItem("access-token");
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
   createUser,
    singIn,
    googleSignIn,
    logoutUser,
    forgetPassword,
    updateUserProfile,
  };

  return (
     <AuthContext value={authInfo}>
            {children}
        </AuthContext>
  );
};

export default AuthProvider;
