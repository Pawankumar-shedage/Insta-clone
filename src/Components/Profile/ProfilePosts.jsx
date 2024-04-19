import { useEffect, useState } from "react";
import { useFirebase } from "../../FirebaseSetUp/FirebaseContext";
import "./Profile.css";
import "/src/index.css";
import { useAuth } from "../../AuthContext/AuthProvider";

export const ProfilePosts = () => {
  // User Posts (Images)
  const { getUserPosts, getUserById } = useFirebase();

  const { currentUser } = useAuth();

  console.log("Ss", currentUser.uid);
  const [user, setUser] = useState(null);
  const getUserDetails = async () => {
    const user = await getUserById(currentUser.uid);
    setUser(user);
  };

  console.log(user);
  // ***Imp
  const getPosts = async () => await getUserPosts(user.uid, user.username);
  //Fetch userPosts
  useEffect(() => {
    getUserDetails();
    if (user !== null) getPosts();
  }, []);

  return (
    <div className="user-posts-container d-flex flex-column justify-content-center">
      <div className="posts-title">
        <div>
          <span role="button">POSTS</span>
        </div>
        <div>
          <span role="button">SAVED</span>
        </div>
        <div>
          <span role="button">TAGGED</span>
        </div>
      </div>
      {/* to add posts,saved,archived options bar */}

      <div className="user-posts"></div>
    </div>
  );
};
