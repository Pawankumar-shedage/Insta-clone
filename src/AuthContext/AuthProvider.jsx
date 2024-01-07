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

  // Loading state
  const [loading, setLoading] = useState(true);

  const handleAuthStateChange = (user) => {
    setCurrentUser(user);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    // to add loading splash screen
    return <div>Loading...</div>;
  }
  // -------------------------------------------------
  return (
    <>
      <authContext.Provider value={{ currentUser, handleAuthStateChange }}>
        {children}
      </authContext.Provider>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(authContext);
};
