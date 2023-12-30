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
  query,
  where,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  connectStorageEmulator,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
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
        email: email,
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

  // SENDING CONVERSATIONS (MESSAGES)
  const sendConversation = async (conversationData) => {
    const conversationRef = collection(db, "conversations");

    /*use addDoc to create a new Document, and use setDoc is used to set the data of a specific document in a Firestore collection.
      It can be used to update an existing document or create a new one if the document doesn't already exist.
      */
    const conversationDoc = await addDoc(conversationRef, conversationData);
    // console.log(conversationDoc.id);

    return conversationDoc.id;
  };

  // ADDING MESSAGES (inside single conversation doc.)
  const addMessageToConversation = async (conversationId, messageData) => {
    try {
      // Ensure conversationId is defined and not an empty string
      if (!conversationId) {
        throw new Error("Conversation ID is invalid");
      }

      const collectionRef = collection(db, "conversations");
      const docRef = doc(collectionRef, `${conversationId}`);

      console.log(docRef);
      const messagecollectionRef = collection(docRef, "messages");

      const newMessage = await addDoc(messagecollectionRef, messageData);

      // Updating with latest message
      // Optionally, update the conversation document with the latest message details
      await updateDoc(docRef, {
        lastMessage: messageData,
      });

      console.log(
        "Firebase Conversation id, ",
        conversationId,
        " Message id",
        newMessage.id
      );

      return newMessage.id;
    } catch (error) {
      console.error("Error", error);
      throw error;
    }
  };

  // FETCH (GET) MESSAGES
  const fetchMessagesFromAConversation = async (
    currentUserId,
    selectedUserId
  ) => {
    try {
      // // first make sure con id is valid
      // if (!conversationId) {
      //   throw new Error("Conversation Id not Valid!");
      // }

      const conversationsQuery = query(
        collection(db, "conversations"),
        where("users", "array-contains-any", [currentUserId, selectedUserId])
      );

      const conversationSnapshot = await getDocs(conversationsQuery);

      let conversationId;

      conversationSnapshot.forEach((doc) => {
        const users = doc.data().users;

        if (users.includes(currentUserId) && users.includes(selectedUserId)) {
          // now we found conversation between users.
          conversationId = doc.id;
        }
      });

      const messages = [];
      if (conversationId) {
        const messageQuery = query(
          collection(db, "conversations", conversationId, "messages")
        );
        const messageSnapshot = await getDocs(messageQuery);

        // setting each message doc into arr[] of messages
        messageSnapshot.forEach((doc) => {
          messages.push({ id: doc.id, data: doc.data() });
        });
      }
      console.log("MEssages", messages);
      // OLD CODE:
      // const conversationDocRef = doc(db, "conversations", conversationId);
      // const messageCollectionRef = collection(conversationDocRef, "messages");

      // // querying messages collection to get all msg-docs
      // const querryMessages = query(messageCollectionRef);

      // const querySnapshot = await getDocs(querryMessages);

      // // now we have all messages (docs), putting each message into an array.
      // const message = [];

      // // now inserting each doc(msg) from message docs into message[]
      // querySnapshot.forEach((msg) => {
      //   message.push({ id: msg.id, data: msg.data() });
      //   // console.log("Each msg", msg);
      // });

      return messages;
    } catch (error) {
      console.log("Error :", error);
      throw error;
    }
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
          addMessageToConversation,
          fetchMessagesFromAConversation,
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
