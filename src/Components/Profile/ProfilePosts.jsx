/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useFirebase } from "../../FirebaseSetUp/FirebaseContext";
import "./Profile.css";
import "/src/index.css";
import { useAuth } from "../../AuthContext/AuthProvider";
import { ViewPostModal } from "./ViewPostModal/ViewPostModal";
import { Modal } from "../Modal/Modal";

export const ProfilePosts = ({ user }) => {
  // User Posts (Images)
  const { getUserPosts } = useFirebase();

  const [imgUrls, setImgUrls] = useState([]);

  const [reloadPage, setReloadPage] = useState(false);

  useEffect(() => {
    const fetchData = async (user) => {
      await getUserDetails(user);
    };

    console.log("Fetching user data and posts for sent user!!");
    if (user) {
      console.log("Fetching user details for ", user.fullName);
      fetchData(user);
    }
  }, [user]);

  const getUserDetails = async (user) => {
    console.log("called", user);

    //sending user as an argument only after it is fetched
    if (user) getPosts(user);
  };

  //refresh profile page if new photo is new img is uploaded.
  useEffect(() => {
    if (imgUrls.length > 0) {
      setReloadPage(true); // Update shouldReloadPage when imgUrls changes
    }
    // console.log("Page reloaded");
  }, [imgUrls]);

  const handlePostClick = (e) => {
    console.log(e.target, " Image Clicked");
  };

  // Posts

  const [timeStamp, setTimeStamp] = useState({});
  const [posts, setPosts] = useState([]);

  const getPosts = async (user) => {
    const userId = user.uid || user.author_uid;
    console.log("UserId posts", userId);
    const username = user.username;

    console.log("get Posts", userId, username);
    const posts = await getUserPosts(userId, username);

    setPosts(posts);

    posts.map((post) => {
      setTimeStamp(post.time);
    });
  };

  // Date
  const date = new Date(timeStamp.timestampValue);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Time
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const weekDayArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekDay = weekDayArr[date.getDay()]; //0-6 starting from sunday -0 to saturday - 6

  // console.log("Date ", `${day}-${month}-${year}`);
  // console.log("time ", `${hours}-${minutes}-${seconds} Day: ${weekDay}`);

  // View Post Modal
  const [viewPost, setViewPost] = useState(false);
  const [clickedPost, setClickedPost] = useState({});

  const closeModal = () => {
    setViewPost(false);
  };
  // ---------------------------------

  return (
    <>
      {viewPost && (
        <Modal closeModal={closeModal}>
          <ViewPostModal post={clickedPost} user={user} />
        </Modal>
      )}

      <div className="user-posts-container d-flex flex-column justify-content-center">
        {/* Header -> Posts,Saved,Reels */}
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

        {posts.length === 0 ? (
          <div className="user-no-posts-msg-box ">
            <span className="fw-medium">No posts yet</span>{" "}
          </div>
        ) : (
          <div className="user-posts">
            {posts.map((post, index) => (
              <div className="up-img-div" key={index} role="button">
                <img
                  src={post.images[0]}
                  onClick={() => {
                    setViewPost(!viewPost);
                    setClickedPost(post);
                  }}
                  alt="img"
                />
              </div>
            ))}
          </div>
        )}

        {/* View Post Modal */}
      </div>
    </>
  );
};
