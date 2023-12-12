/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { createContext, useContext } from "react";

// Firebase Config/set-up
const firebaseConfig = {
  apiKey: "AIzaSyBOwuZRc6YOlaGKeXg3axvJ-GLtj4DYrfc",
  authDomain: "insta-clone-63ffb.firebaseapp.com",
  projectId: "insta-clone-63ffb",
  storageBucket: "insta-clone-63ffb.appspot.com",
  messagingSenderId: "1018926149177",
  appId: "1:1018926149177:web:61602f0191ea3c998467e8",
  measurementId: "G-1KTQW5T9DR",
};

const app = initializeApp(firebaseConfig);

const firebaseContext = createContext();
export const FirebaseContext = ({ children }) => {
  // helper functions
  const greet = () => {
    return "wheo";
  };

  // -----------------------------------------------------------------------------------
  return (
    <>
      <firebaseContext.Provider value={{ greet }}>
        {children}
      </firebaseContext.Provider>
    </>
  );
};

export const useFirebase = () => {
  return useContext(firebaseContext);
};
