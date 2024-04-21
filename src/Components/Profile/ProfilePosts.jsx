import { useEffect, useState } from "react";
import { useFirebase } from "../../FirebaseSetUp/FirebaseContext";
import "./Profile.css";
import "/src/index.css";
import { useAuth } from "../../AuthContext/AuthProvider";

export const ProfilePosts = () => {
  // User Posts (Images)
  const { getUserPosts, getUserById } = useFirebase();

  const { currentUser } = useAuth();

  const [user, setUser] = useState(null);

  const [imgUrls, setImgUrls] = useState([]);

  const [reloadPage, setReloadPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getUserDetails();
    };

    console.log("Fetching user data and posts");
    if (!user) fetchData();
  }, [user, reloadPage]);

  const getUserDetails = async () => {
    const user = await getUserById(currentUser.uid);
    setUser(user);

    //sending user as an argument only after it is fetched
    if (user) getPosts(user);
  };

  // console.log("USER", user);

  // Fetching photos.

  const getPosts = async (user) => {
    console.log("getPosts called", user);
    const imgUrls = await getUserPosts(user.uid, user.username);
    console.log("Img urls ", imgUrls);

    setImgUrls(imgUrls);
  };

  //refresh profile page if new photo is new img is uploaded.
  useEffect(() => {
    if (imgUrls.length > 0) {
      setReloadPage(true); // Update shouldReloadPage when imgUrls changes
    }
    console.log("Page reloaded");
  }, [imgUrls]);

  // Img Click (Post view -> enlarge.)
  const handleImgClick = (e) => {
    console.log(e.target, " Image Clicked");
  };

  // ---------------------------------
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
      <div className="user-posts">
        {imgUrls.map((imgUrl, index) => {
          return (
            <div key={index}>
              <img src={imgUrl} alt="image" onClick={handleImgClick} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
