/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { createContext, useContext, useState } from "react";

// FIREBASE CONFIG/SET-UP
const firebaseConfig = {
  apiKey: "AIzaSyBOwuZRc6YOlaGKeXg3axvJ-GLtj4DYrfc",
  authDomain: "insta-clone-63ffb.firebaseapp.com",
  projectId: "insta-clone-63ffb",
  storageBucket: "insta-clone-63ffb.appspot.com",
  messagingSenderId: "1018926149177",
  appId: "1:1018926149177:web:61602f0191ea3c998467e8",
  measurementId: "G-1KTQW5T9DR",
};

// REFERENCE OBJECTS
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const firebaseContext = createContext();

export const FirebaseContext = ({ children }) => {
  // HELPER FUNCTIONS

  // Adding data to users collections
  const addUser = async ({ username, email, profileImg, displayName, bio }) => {
    console.log(email);
    try {
      // addDoc(ref,{document}) -->Add Write data.
      const docRef = await addDoc(collection(db, "Users"), {
        username: username,
        email: email,
        profileImg: profileImg,
        displayName: displayName,
        bio: bio,
      });
      console.log("Successful Addition-Document written with ID: ", docRef.id);
    } catch (error) {
      console.log("Error in adding user data : ", error);
    }
  };

  // Retreiving data. getDocs(ref)
  const getUser = async () => {
    // storing documents from the collection (object(s)) in an array and returning it
    const userData = [];

    const querySnapshot = await getDocs(collection(db, "Users"));

    querySnapshot.forEach((doc) => {
      console.log(`doc id: ${doc.id}=> ${doc.data()}`);
      userData.push(doc.data());
    });
    return userData; //returning array of objects
  };

  // Uploading Profile Pic (DP)
  const uploadProfilePhotos = async (file) => {
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(storage, `profilePics/${file.name}}`);
    try {
      const snapshot = await uploadBytes(storageRef, file, metadata);
      console.log("File uploaded successfully!", snapshot);

      // Retrieve the download url of uploaded file.
      const url = await getDownloadURL(storageRef);
      console.log("image download url: ", url);
      return url;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // -----------------------------------------------------------------------------------
  return (
    <>
      <firebaseContext.Provider
        value={{ addUser, getUser, uploadProfilePhotos }}
      >
        {children}
      </firebaseContext.Provider>
    </>
  );
};

export const useFirebase = () => {
  return useContext(firebaseContext);
};
