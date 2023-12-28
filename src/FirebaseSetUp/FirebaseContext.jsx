/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
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
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const firebaseContext = createContext();

export const FirebaseContext = ({ children }) => {
  // HELPER FUNCTIONS

  // ADDING DATA TO USERS COLLECTIONS
  const addUser = async ({ username, email, fullName, password }) => {
    // console.log(email);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log(user);

      const additionalData = {
        username: username,
        fullName: fullName,
      };

      const userCollection = collection(db, "Users");
      const docRef = await doc(userCollection, user.uid);

      await setDoc(docRef, additionalData);

      console.log("Successful Addition-Document written with ID: ", docRef.id);

      return user;
    } catch (error) {
      console.log("Error in adding user data : ", error);
      throw error;
    }
  };

  // LOGGING USER IN
  const logInUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return user;
    } catch (error) {
      console.log("Error Logging in: ", error);
      throw error;
    }
  };

  // RETREIVING DATA. getDocs(ref)
  const getUser = async () => {
    // storing documents from the collection (object(s)) in an array and returning it
    const userData = [];

    const userDocs = await getDocs(collection(db, "Users"));

    userDocs.forEach((doc) => {
      // console.log(`doc id: ${doc.id}=> ${doc.data()}`);
      userData.push(doc.data());
    });
    return userData; //returning array of objects (users)
  };

  // UPDATING USER
  const updateUserInFirestore = async (userId) => {
    try {
      // getting user doc reference
      const userCollection = collection(db, "Users");
      const userDocRef = doc(userCollection, userId);

      // updating uid of user
      await updateDoc(userDocRef, {
        uid: userId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // UPLOADING PROFILE PIC (DP)
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

  // SENDING CONVERSATIONS MESSAGES
  const sendConversation = async (conversationData) => {
    const conversationRef = collection(db, "conversations");

    /*use addDoc to create a new Document, and use setDoc is used to set the data of a specific document in a Firestore collection.
      It can be used to update an existing document or create a new one if the document doesn't already exist.
      */
    const conversationDoc = await addDoc(conversationRef, conversationData);
    console.log(conversationDoc.id);

    return conversationDoc.id;
  };

  // Getting profile photo current-user
  // const getProfilePic = async

  // -----------------------------------------------------------------------------------
  return (
    <>
      <firebaseContext.Provider
        value={{
          auth,
          addUser,
          getUser,
          uploadProfilePhotos,
          logInUser,
          updateUserInFirestore,
          sendConversation,
        }}
      >
        {children}
      </firebaseContext.Provider>
    </>
  );
};

export const useFirebase = () => {
  return useContext(firebaseContext);
};
