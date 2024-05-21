/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext/AuthProvider";
import { Footer } from "../Components/Common/Footer/Footer";

import { Sidebar } from "../Components/Sidebar/Sidebar";
import Stories from "../Components/Stories/Stories";
import "/src/index.css";
import "/src/Styles/Home/Home.css";
import { LoadingScreen } from "../Components/Common/Loading-Splash Screen/LoadingScreen";
import { useFirebase } from "../FirebaseSetUp/FirebaseContext";
import { MobileHomePage } from "./Mobile/Home/MobileHomePage";
import { useProfilePhotoOfCurrUser } from "../Components/Profile/ProfilePhotoContext/ProfilePhotoContext";

export const Home = () => {
  const { getPostsForHomePg, getUser, updateUserPostData } = useFirebase();
  const { currentUser } = useAuth();
  const { dpCurrUser, dpLoading } = useProfilePhotoOfCurrUser();

  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUser();

        const fetchedPosts = await getPostsForHomePg(users);

        setPosts(fetchedPosts);

        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    // Initial check
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust this value as needed for your mobile breakpoint
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    fetchData();

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Update Post data, ** GENERIC () for all post data (likes,comment,..)

  // 1.Update post locally
  // 2.Then update in firestore
  const updatePost = async (postId, newPostData, userId, username) => {
    const updatedPost = await updateUserPostData(
      postId,
      newPostData,
      userId,
      username
    );

    // console.log("Post update successfull:", updatedPost);
  };

  const handleLike = async (post) => {
    const likedByArray = Array.isArray(post.likedBy) ? post.likedBy : [];

    console.log(currentUser.uid, "arr ", likedByArray);

    const newIsPostLiked = !likedByArray.includes(currentUser.uid);

    const updatedLikedBy = newIsPostLiked
      ? [...likedByArray, currentUser.uid]
      : likedByArray.filter((userId) => userId !== currentUser.uid);

    console.log(updatedLikedBy);

    // checking UPDATED likedBy
    // const postLiked = updatedLikedBy.includes(currentUser.uid) ? true : false;

    const newPostData = {
      likeCount: updatedLikedBy.length,
      isPostLiked: newIsPostLiked,
      likedBy: updatedLikedBy,
    };

    // 1. local update,
    const updatedPosts = posts.map((p) =>
      p.postId === post.postId ? { ...p, ...newPostData } : p
    );
    setPosts(updatedPosts);

    console.log("Post Data:", post, "DATA", newPostData);

    // 2. Update firestore post document.
    try {
      await updatePost(post.postId, newPostData, post.userId, post.username);
    } catch (error) {
      console.log("Error updating post: ", error);
    }
  };

  const checkIfPostLikedByCurrUser = (likedBy) => {
    // console.log("LikedBy [] checking before rendering post", likedBy);
    return likedBy.includes(currentUser.uid);
  };

  // Profile Photo (DP)
  const defaultDp = "/src/assets/Images/User i/user.png";

  // ------------------------------
  if (loading) {
    return <LoadingScreen />;
  }
  // console.log("Posts ", posts);

  // --------------------RETURN-----
  return (
    <>
      <div className="home-mount-0">
        {isMobile ? (
          <MobileHomePage posts={posts} />
        ) : (
          <div className="home-container">
            {/* Action buttons section */}

            {/* To put sibebar on left when scree-width >= 768px Tablet */}
            <div className="sidebar">
              <Sidebar />
            </div>

            <section>
              <div className="section-stories-posts-footer">
                {/* <div className="stories-header">
                <Stories />
                </div> */}

                <div className="main-feed-section">
                  <div className="feed">
                    {/* Posts = posts + reels videos.. */}

                    {posts.map((post, index) => {
                      const postLikedByCurrUser = checkIfPostLikedByCurrUser(
                        post.likedBy || []
                      );
                      return (
                        <div
                          className="feed-post"
                          key={index}
                          // onClick={() => console.log("Post clicked: ", post)}
                        >
                          {/* Header */}
                          <div className="fp-header">
                            <div className="fp-header-user-info">
                              <div className="fph-profile-photo">
                                <img
                                  src={
                                    post.userId === currentUser.uid &&
                                    !dpLoading
                                      ? dpCurrUser || defaultDp
                                      : post.profilePhoto || defaultDp
                                  }
                                  alt="profile-photo"
                                />
                              </div>
                              <div className="fph-username">
                                {post.username}
                              </div>
                            </div>

                            <div className="fp-header-settings">
                              <svg
                                aria-label="More options"
                                fill="currentColor"
                                role="img"
                                viewBox="0 0 24 24"
                              >
                                <title>More options</title>
                                <circle cx="12" cy="12" r="1.5"></circle>
                                <circle cx="6" cy="12" r="1.5"></circle>
                                <circle cx="18" cy="12" r="1.5"></circle>
                              </svg>
                            </div>
                          </div>

                          {/* Image */}
                          <div className="fp-image-container">
                            {/* Image carousal */}
                            <img src={post.images[0]} alt=" image" />
                          </div>

                          {/* Action btns footer -> div - like,comment,share ,div- Add comments */}
                          <div className="fp-footer">
                            <div className="fphome-post-actionBtns mt-3">
                              <div className="fphome-post-actionBtns-left">
                                {/* like btn */}
                                <div className="vpmb-actionBtn-like">
                                  <span
                                    id="post-likeBtn"
                                    onClick={(e) => handleLike(post)}
                                  >
                                    {postLikedByCurrUser ? (
                                      <svg
                                        aria-label="Unlike"
                                        fill="red"
                                        height="24"
                                        role="img"
                                        viewBox="0 0 48 48"
                                        width="24"
                                      >
                                        <title>Unlike</title>
                                        <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                                      </svg>
                                    ) : (
                                      // {/* Unlike */}
                                      <svg
                                        aria-label="Like"
                                        fill="currentColor"
                                        height="24"
                                        width="24"
                                        role="img"
                                        viewBox="0 0 24 24"
                                      >
                                        <title>Like</title>
                                        <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                                      </svg>
                                    )}
                                  </span>
                                </div>

                                {/* Comment btn */}
                                <div className="vpmb-actionBtn-comment ms-3">
                                  <span id="post-commentBtn">
                                    <svg
                                      aria-label="Comment"
                                      fill="currentColor"
                                      height="24"
                                      role="img"
                                      viewBox="0 0 24 24"
                                      width="24"
                                    >
                                      <title>Comment</title>
                                      <path
                                        d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                      ></path>
                                    </svg>
                                  </span>
                                </div>

                                {/* Share btn */}
                                <div className="vpmb-actionBtn-share ms-3">
                                  <span id="post-shareBtn">
                                    <svg
                                      aria-label="Share Post"
                                      fill="currentColor"
                                      height="24"
                                      role="img"
                                      viewBox="0 0 24 24"
                                      width="24"
                                    >
                                      <title>Share Post</title>
                                      <line
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        x1="22"
                                        x2="9.218"
                                        y1="3"
                                        y2="10.083"
                                      ></line>
                                      <polygon
                                        fill="none"
                                        points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                                        stroke="currentColor"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                      ></polygon>
                                    </svg>
                                  </span>
                                </div>
                              </div>

                              <div className="mbhome-post-actionBtns-bookmark">
                                <span id="post-bookmarkBtn">
                                  <svg
                                    aria-label="Save"
                                    fill="currentColor"
                                    height="24"
                                    role="img"
                                    viewBox="0 0 24 24"
                                    width="24"
                                  >
                                    <title>Save</title>
                                    <polygon
                                      fill="none"
                                      points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                    ></polygon>
                                  </svg>
                                </span>
                              </div>
                            </div>

                            {/* Liked by users */}
                            <div className="vp-cs-likedBy">
                              <div className="fphome-likedBy-likes  mt-2">
                                <span className="">
                                  {/* last three people profile photos who liked the image */}
                                  <b>
                                    <small>
                                      {post.likeCount > 0 &&
                                        post.likeCount +
                                          ` like${
                                            post.likeCount > 1 ? `s` : ""
                                          }`}
                                    </small>
                                  </b>
                                </span>
                              </div>
                              <div className="vpmb-likedBy-postTimeStamp"></div>
                            </div>

                            {/* Post Caption */}
                            <div className="fphome-post-caption-container">
                              <div className="fphome-post-caption">
                                {/* username */}
                                <div className="fphome-postCaption-userName">
                                  <span>
                                    <small>
                                      <b>{post.username}</b>
                                    </small>
                                  </span>
                                </div>
                                {/* caption */}
                                <div className="fphome-postCaption-caption ms-3 ">
                                  <span>{post.caption}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Footer */}
                    <div className="home-footer mb-3">
                      <Footer />
                    </div>
                  </div>

                  {/* !Main feed */}
                </div>
              </div>
            </section>

            {/* !home container */}
          </div>
        )}
      </div>
    </>
  );
};
