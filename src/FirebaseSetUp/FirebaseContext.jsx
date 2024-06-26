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
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import {
  connectStorageEmulator,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { createContext, useContext, useId, useState } from "react";

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
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("Firebase User", user);

      console.log("This", email);
      const additionalData = {
        username: username,
        fullName: fullName,
        email: email,
        author_uid: user.uid,
      };

      const userCollection = collection(db, "Users");

      const docRef = doc(userCollection, user.uid);

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

  // RETREIVING ALL USERS DATA. getDocs(ref)
  const getUser = async () => {
    const userData = [];

    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const userDocs = await getDocs(collection(db, "Users"));

      userDocs.forEach((doc) => {
        // console.log(`doc id: ${doc.id} => ${doc.data()}`);
        userData.push(doc.data());
      });

      return userData; //returning array of objects (users)
    } catch (error) {
      console.error("Error in getting user data: ", error);
      throw error;
    }
  };

  // Getting Logged in USER by id
  const getUserById = async (userId) => {
    try {
      const userDocQuery = query(
        collection(db, "Users"),
        where("author_uid", "==", userId)
      );
      const userDoc = await getDocs(userDocQuery);

      let user = null;

      userDoc.forEach((doc) => {
        user = doc.data();
        // user.push(doc.data());
      });

      // console.log("USER:", user);

      return user;
    } catch (error) {
      console.log("Error getting user by id: ", error);
      throw error;
    }
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

  const uploadProfilePhotos = async (file, userId) => {
    const imgUrls = [];

    console.log("FIle ", file.name);

    try {
      const storageRef = ref(storage, `profilePics/${userId}/${file.name}`);

      const metadata = {
        contentType: "image/jpeg,image/png,image/jpg,image/JPEG",
        timeAndData: serverTimestamp(),
      };

      const snapshot = await uploadBytes(storageRef, file, metadata);

      console.log("Upload successfull @", snapshot);

      const downloadUrl = await getDownloadURL(snapshot.ref);

      imgUrls.push(downloadUrl);

      return imgUrls[0];
    } catch (error) {
      console.log(error, " occurred while uploading profile photo");
    }
  };

  // STORING POSTS of user

  const uploadPhotos = async (files, userId, username) => {
    const imgUrls = [];

    try {
      for (const file of files) {
        const storageRef = ref(
          storage,
          `user-posts/${username}/${userId}/${file.name}`
        );

        const metadata = {
          contentType: "image/jpeg,image/png,image/jpg,image/JPEG",
          timeAndData: serverTimestamp(),
        };

        const snapshot = await uploadBytes(storageRef, file, metadata);

        console.log("Upload successfull @", snapshot);

        const downloadUrl = await getDownloadURL(snapshot.ref);

        imgUrls.push(downloadUrl);
      }

      return imgUrls;
    } catch (error) {
      console.log(error, " occurred while uploading photos");
    }
  };

  const uploadUserPostData = async (postData, userId, username) => {
    const collectionRef = collection(db, `Posts/${userId}/${username}`);

    try {
      const docRef = await addDoc(collectionRef, postData);

      console.log("Post uploaded successfully! ", docRef);
    } catch (error) {
      console.log("Error posting user posts ", error);
    }
  };

  const updateUserPostData = async (postId, postData, userId, username) => {
    const collectionRef = collection(db, `Posts/${userId}/${username}`);

    const docRef = doc(collectionRef, postId);
    try {
      await setDoc(docRef, postData, { merge: true });
      // console.log("Post doc", docRef.data());
      const updatedPostDoc = await getDoc(docRef);

      // console.log("Updated Post Data: ", updatedPostDoc);

      if (updatedPostDoc.exists()) {
        return updatedPostDoc.data();
      } else {
        throw new Error("Post doesn't exists");
      }
    } catch (error) {
      console.log("Error updating post: ", error);
    }
  };

  // obj{caption,img,time} of single user
  const getUserPosts = async (userId, username) => {
    const q = query(collection(db, `Posts/${userId}/${username}`));

    //all documents (posts) of a single user

    const posts = [];

    const querySnaphot = await getDocs(q);

    querySnaphot.forEach((doc) => {
      console.log("Post doc", doc);
      const time = doc._document.data.value.mapValue.fields.time;
      // const time = "time";

      // assigning doc.data() object properties to detailedPostData obj{}
      const detailedPostData = Object.assign({}, doc.data());

      detailedPostData.time = time;

      posts.push(detailedPostData);
    });

    return posts;
  };

  const getPostsForHomePg = async (users) => {
    // console.log("For Every User");

    const posts = [];

    // Because there is asynchronous map () , that returns array of promises. if we don't wait for these Promises then the getPostsForHomePg() return empty posts[]
    await Promise.all(
      users.map(async (user) => {
        const postCollectionRef = collection(
          db,
          `Posts/${user.uid}/${user.username}`
        );

        // console.log("POSTS ", postCollectionRef);
        try {
          const querySnapshot = await getDocs(postCollectionRef);

          querySnapshot.forEach((doc) => {
            // console.log("Post Doc", doc.data(), doc);

            const postData = Object.assign({}, doc.data());

            postData.time = doc._document.data.value.mapValue.fields.time;
            postData.username = user.username;
            postData.userId = user.uid;
            postData.postId = doc.id;

            posts.push(postData);
            // console.log(doc.id, " => ", doc.data());
          });
        } catch (error) {
          console.error("Error getting documents: ", error);
        }
      })
    );

    return posts;
  };

  const setProfilePhoto = async (profileUrl, userId) => {
    if (!userId) {
      console.log("Error: userId is empty or invalid.", userId);
      return;
    }

    const collectionRef = collection(db, "ProfilePics");

    const docRef = doc(collectionRef, userId);

    const profilePhoto = {
      url: profileUrl,
    };

    try {
      await setDoc(docRef, profilePhoto, { merge: true });
    } catch (error) {
      console.log("Error ", error);
    }
  };

  const getProfilePhoto = async (userId) => {
    // console.log("UserId ", userId);
    if (!userId) throw new Error("userId is required");

    const docRef = doc(db, "ProfilePics", userId);

    const querySnapshot = await getDoc(docRef);

    // console.log("de", querySnapshot);
    try {
      let profilePhoto = null;

      if (querySnapshot.exists()) {
        // console.log(querySnapshot.data().url);
        return querySnapshot.data().url || "/assets/Images/User i/user.png";
      } else {
        const defaultProfilePhoto = "/assets/Images/User i/user.png";
        return defaultProfilePhoto;
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  // --------------------------MESSAGES------------------
  const sendConversation = async (conversationData) => {
    try {
      console.log(
        "User IDs:",
        conversationData.users[0],
        conversationData.users[1],

        conversationData.users
      );

      const sortedUserIds = conversationData.users.slice().sort();
      console.log("Sorted users", sortedUserIds);

      const existingConversationQuery = query(
        collection(db, "conversations"),
        where("users", "==", sortedUserIds)
      );

      const existingConversationSnapshot = await getDocs(
        existingConversationQuery
      );

      let existingConversationId;

      console.log(existingConversationSnapshot);

      if (!existingConversationSnapshot.empty) {
        // If a conversation already exists, retrieve its ID
        existingConversationId = existingConversationSnapshot.docs[0].id;
        console.log("Conversation already exists:", existingConversationId);
      } else {
        const newConversationRef = await addDoc(
          collection(db, "conversations"),
          conversationData
        );
        console.log(newConversationRef);

        existingConversationId = newConversationRef.id;
        console.log("New conversation created:", existingConversationId);
      }

      // Set the retrieved or created conversation ID
      // setConversationId(existingConversationId);

      console.log("Conversation Id SENT: ", existingConversationId);

      return existingConversationId;
    } catch (error) {
      console.error("Error starting or retrieving conversation:", error);
      throw error;
    }
  };

  // ADDING MESSAGES (inside single conversation doc.)
  const addMessageToConversation = async (conversationId, messageData) => {
    try {
      // Ensure conversationId is defined and not an empty string
      if (!conversationId) {
        throw new Error("Conversation ID is invalid");
      }

      // const collectionRef = collection(db, "conversations");
      const docRef = doc(db, "conversations", conversationId);

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
  const fetchMessagesFromAConversation = async (conversationId) => {
    try {
      console.log(conversationId);

      const messagesQuery = query(
        collection(db, "conversations", `${conversationId}`, "messages"),
        orderBy("timestamp.serverTimestamp")
      );

      const messagesSnapshot = await getDocs(messagesQuery);

      const messages = [];

      messagesSnapshot.forEach((doc) => {
        // Add each message document's data to the messages array
        messages.push({ id: doc.id, data: doc.data() });
      });

      console.log(messagesSnapshot);

      return messages;
    } catch (error) {
      console.error("Error Fetching Messages :", error);
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
          setProfilePhoto,
          getProfilePhoto,
          uploadPhotos,
          uploadUserPostData,
          updateUserPostData,
          getUserPosts,
          getPostsForHomePg,
          logInUser,
          updateUserInFirestore,
          sendConversation,
          addMessageToConversation,
          fetchMessagesFromAConversation,
          getUserById,
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
