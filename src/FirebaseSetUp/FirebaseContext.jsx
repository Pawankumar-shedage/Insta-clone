/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
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
const db = getFirestore(app);

const firebaseContext = createContext();
export const FirebaseContext = ({ children }) => {
  // helper functions
  const greet = (val) => {
    return "wheo" + val;
  };

  // Adding data to users collections
  const addUser = async ({ username, email, profileImg, displayName, bio }) => {
    console.log(email);
    try {
      const docRef = await addDoc(collection(db, "Users"), {
        username: username,
        email: email,
        profileImg: profileImg,
        displayName: displayName,
        bio: bio,
      });

      console.log("User data added sucessfully");
    } catch (error) {
      console.log("Error in adding user data : ", error);
    }
  };

  // -----------------------------------------------------------------------------------
  return (
    <>
      <firebaseContext.Provider value={{ greet, addUser }}>
        {children}
      </firebaseContext.Provider>
    </>
  );
};

export const useFirebase = () => {
  return useContext(firebaseContext);
};
