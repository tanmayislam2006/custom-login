import React, { useEffect, useState } from "react";
import SmartBillContext from "./SmartBillContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../Firebase/firebase.init";
import axios from "axios";
const googleProvider = new GoogleAuthProvider();
const SmartBillProvider = ({ children }) => {
  const [fireBaseUser, setFireBaseUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const createAccount = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logInAccount = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logoutUser = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setFireBaseUser(currentUser);
      setLoading(false);
      if (currentUser?.uid) {
        axios.post(
          "http://localhost:4000/jsonwebtoken",
          { uid: currentUser?.uid },
          { withCredentials: true }
        );
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    fetch(`http://localhost:4000/user/${fireBaseUser?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false)
      });
  }, [fireBaseUser]);
  const information = {
    googleLogIn,
    createAccount,
    logInAccount,
    fireBaseUser,
    logoutUser,
    loading,
    user,
  };

  return <SmartBillContext value={information}>{children}</SmartBillContext>;
};

export default SmartBillProvider;
