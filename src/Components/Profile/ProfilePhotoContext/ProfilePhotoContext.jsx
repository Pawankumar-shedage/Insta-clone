/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { useFirebase } from "../../../FirebaseSetUp/FirebaseContext";
import { useAuth } from "../../../AuthContext/AuthProvider";

const ProfilePhotoContext = createContext();

// Create a provider component
export const ProfilePhotoProvider = ({ children }) => {
  const [dpCurrUser, setDpCurrUser] = useState(null);
  const { currentUser } = useAuth();
  const { getProfilePhoto } = useFirebase();
  const [dpLoading, setDpLoading] = useState(true);

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      if (currentUser) {
        try {
          const photoUrl = await getProfilePhoto(currentUser.uid);
          console.log("Photo Url", photoUrl);
          setDpCurrUser(photoUrl);
        } catch (error) {
          console.error("Error fetching profile photo:", error);
        } finally {
          setDpLoading(false);
        }
      }
    };

    fetchProfilePhoto();
  }, [currentUser, getProfilePhoto]);

  return (
    <ProfilePhotoContext.Provider
      value={{ dpCurrUser, setDpCurrUser, dpLoading }}
    >
      {children}
    </ProfilePhotoContext.Provider>
  );
};

// Create a custom hook to use the ProfilePhotoContext
export const useProfilePhotoOfCurrUser = () => useContext(ProfilePhotoContext);
