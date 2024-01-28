/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { useFirebase } from "../FirebaseSetUp/FirebaseContext";
import { onAuthStateChanged } from "firebase/auth";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const { auth } = useFirebase();

  // user object
  const [currentUser, setCurrentUser] = useState(null);

  // is user Authenticated
  const [isAuthenticated, setIsUserAuthenticated] = useState(false);

  // Loading state
  const [loading, setLoading] = useState(true);

  const handleAuthStateChange = (user) => {
    if (user) {
      // User is signed in
      setIsUserAuthenticated(true);

      setCurrentUser(user);

      console.log("User signed in:", user.uid);
    } else {
      // User is signed out
      setIsUserAuthenticated(false);
      console.log("User signed out");
    }
    // setCurrentUser(user);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  // -------------------------------------------------
  return (
    <>
      <authContext.Provider
        value={{ currentUser, handleAuthStateChange, isAuthenticated }}
      >
        {children}
      </authContext.Provider>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(authContext);
};
