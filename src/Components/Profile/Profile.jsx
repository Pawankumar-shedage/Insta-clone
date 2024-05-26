/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext/AuthProvider";
import { useFirebase } from "../../FirebaseSetUp/FirebaseContext";
import { Sidebar } from "../Sidebar/Sidebar";
import "./Profile.css";
import "/src/index.css";
// icons
import { ProfileHeader } from "./ProfileHeader";
// import { StoryHighlights } from "./StoryHighlights";
import { ProfilePosts } from "./ProfilePosts";
import { LoadingScreen } from "../Common/Loading-Splash Screen/LoadingScreen";
import { MobileNavbar } from "../../Pages/Mobile/Navbar/MobileNavbar";

export const Profile = () => {
  const { currentUser } = useAuth();

  const { getUserById } = useFirebase();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

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
    getUser();
    // Initial check
    const handleResize = () => {
      setIsMobile(window.innerWidth < 425); // Adjust this value as needed for your mobile breakpoint
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Loading screen
  if (loading)
    return (
      <div className="text-center">
        <LoadingScreen />
      </div>
    );

  console.log(user);

  // // Later-Story-highlight slides
  // const slides = [
  //   "/src/assets/Images/joker_4k_8k-7680x4320.jpg",
  //   "/src/assets/Images/joker_4k_8k-7680x4320.jpg",
  //   "/src/assets/Images/joker_4k_8k-7680x4320.jpg",
  //   "/src/assets/Images/joker_4k_8k-7680x4320.jpg",
  //   "/src/assets/Images/joker_4k_8k-7680x4320.jpg",
  //   "/src/assets/Images/joker_4k_8k-7680x4320.jpg",
  // ];

  // -----------------RETURN-------
  return (
    <div className="profile-mount">
      <div className="profile-container">
        <div className="profile-sidebar">{!isMobile && <Sidebar />}</div>

        {/* MAIN */}
        <div className="profile-display ">
          <ProfileHeader user={user} />

          {/* <StoryHighlights slides={slides} /> */}

          <ProfilePosts />
        </div>

        {/* If screen width is <= 435px */}

        {isMobile && <MobileNavbar />}
      </div>
    </div>
  );
};
