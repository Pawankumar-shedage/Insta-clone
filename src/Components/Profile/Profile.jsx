/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext/AuthProvider";
import { useFirebase } from "../../FirebaseSetUp/FirebaseContext";
import { Sidebar } from "../Sidebar/Sidebar";
import "./Profile.css";
import "/src/index.css";
// icons
import { ProfileHeader } from "./ProfileHeader";
import { StoryHighlights } from "./StoryHighlights";
import { ProfilePosts } from "./ProfilePosts";

export const Profile = () => {
  const { currentUser } = useAuth();

  const { getUserById } = useFirebase();

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const user = await getUserById(currentUser.uid);
      setUser(user);
      setLoading(false);
    } catch (e) {
      console.log("Error getting user: ", e);
      throw new e();
    }
  };

  useEffect(() => {
    console.log("Function called");
    getUser();
  }, []);

  // Loading screen
  if (loading) return <div className="text-center">Loading profile</div>;

  console.log(user);

  // -----------------RETURN-------
  return (
    <div className="profile-mount">
      <div className="profile-container">
        <div className="profile-sidebar">
          <Sidebar />
        </div>

        {/* MAIN */}
        <div className="profile-display ">
          <ProfileHeader user={user} />

          <StoryHighlights />

          <ProfilePosts />
        </div>
      </div>
    </div>
  );
};
