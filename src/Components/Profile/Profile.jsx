/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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
import { useNavigate, useParams } from "react-router-dom";
import { SearchBar } from "../Sidebar/SearchBar";

export const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { getUser } = useFirebase();

  console.log("UserId in profile", userId);

  const { getUserById } = useFirebase();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState({});
  const [toggleSearchBar, setToggleSearchBar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUser();

        setUsers(users);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchUsers();
  }, []);

  const getUserForProfile = async () => {
    try {
      const user = await getUserById(userId);

      console.log("User in profile", user);
      setUser(user);

      // console.log("Sent user", user);
      setLoading(false);
    } catch (e) {
      console.log("Error getting user: ", e);
      throw new e();
    }
  };

  useEffect(() => {
    getUserForProfile();
    // Initial check
    const handleResize = () => {
      setIsMobile(window.innerWidth < 426); // Adjust this value as needed for your mobile breakpoint
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    // console.log("PRofile page", userId);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleDataFromSidebar(data) {
    console.log("data from sidebar", data);
    setToggleSearchBar(data.searchBar);
  }

  // Loading screen
  if (loading)
    return (
      <div className="text-center">
        <LoadingScreen />
      </div>
    );

  // console.log(user);

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
        <div className="profile-sidebar">
          {!isMobile && <Sidebar sendDataToHome={handleDataFromSidebar} />}
        </div>

        {toggleSearchBar && <SearchBar users={users} />}
        {/* MAIN */}
        <div className="profile-display ">
          {user ? (
            <>
              {isMobile && (
                <div className="mb-prof-nav-back-top d-flex flex-row justify-content-start">
                  <div className="mbprof-nav-back">
                    <span
                      onClick={() => {
                        console.log("Back");
                        navigate(-1);
                      }}
                    >
                      <svg
                        aria-label="Back"
                        fill="currentColor"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <title>Back</title>
                        <line
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          x1="2.909"
                          x2="22.001"
                          y1="12.004"
                          y2="12.004"
                        ></line>
                        <polyline
                          fill="none"
                          points="9.276 4.726 2.001 12.004 9.276 19.274"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></polyline>
                      </svg>
                    </span>
                  </div>
                  <div className="mbprofnavback-user-name">
                    <span>{user.username}</span>
                  </div>
                </div>
              )}

              <ProfileHeader user={user} />
              {/* <StoryHighlights slides={slides} /> */}
              <ProfilePosts user={user} />
            </>
          ) : (
            <div className="text-center">
              <LoadingScreen />
            </div>
          )}
        </div>

        {/* If screen width is <= 435px */}

        {isMobile && <MobileNavbar />}
      </div>
    </div>
  );
};
