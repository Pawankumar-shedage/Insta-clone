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

export const Home = () => {
  const { getPostsForHomePg, getUser } = useFirebase();

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

  if (loading) {
    return <LoadingScreen />;
  }

  console.log("Posts ", posts);

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

                    {posts.map((post, index) => (
                      <div className="feed-post" key={index}>
                        {/* Header */}
                        <div className="fp-header">
                          <div className="fp-header-user-info">
                            <div className="fph-profile-photo">DP</div>
                            <div className="fph-username">{post.username}</div>
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
                          <div className="mbhome-post-actionBtns">
                            <div className="mbhome-post-actionBtns-left">
                              <div className="vpmb-actionBtn-like">
                                <span id="post-likeBtn">
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
                                </span>
                              </div>
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
                            <div className="vpmb-likedBy-likes  mt-2">
                              <span className="ms-4">
                                {/* last three people profile photos who liked the image */}
                                <b>
                                  <small>109 likes</small>
                                </b>
                              </span>
                            </div>
                            <div className="vpmb-likedBy-postTimeStamp"></div>
                          </div>

                          {/* Post Caption */}
                          <div className="mbhome-post-caption">
                            <div className="mbpost-caption-userDetails">
                              <div className="vpmb-postCaption-userName">
                                <span>
                                  <b>{post.username}</b>{" "}
                                </span>
                              </div>
                              <div className="vpmb-postCaption-caption ms-3 ">
                                <span>{post.caption}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

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
