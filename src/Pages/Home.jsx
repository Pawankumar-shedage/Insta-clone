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
      setIsMobile(window.innerWidth <= 425); // Adjust this value as needed for your mobile breakpoint
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
            <div className="sidebar">
              <Sidebar />
            </div>

            {/* Right section (header + posts) */}
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
                          <div className="fp-settings">
                            <span>Settings</span>
                          </div>
                        </div>

                        {/* Image */}
                        <div className="fp-image-container">
                          <img src={post.images[0]} alt=" image" />
                        </div>

                        {/* Action btns footer -> div - like,comment,share ,div- Add comments */}
                        <div className="fp-footer">{post.caption}</div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="footer">
                    <Footer />
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
