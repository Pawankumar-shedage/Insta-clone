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

export const Home = () => {
  const { getUserPosts } = useFirebase();

  // --------------------RETURN-----
  return (
    <>
      <div className="home-mount-0">
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
                  <div>
                    <div className="post-header">Header</div>
                    <div className="post-body">Body</div>

                    {/* footer -> div - like,comment,share ,div- Add comments */}
                    <div className="post-footer">Footer</div>
                  </div>
                </div>

                {/* Footer */}
                <div className="footer">
                  <Footer />
                </div>

                {/* !Main feed */}
              </div>
            </div>
          </section>

          {/* Suggested profile section for desktop view */}
          {/* <suggest-section>
            <div className="suggested-profile-section">
              <div className="user-prof-current">
                <div className="current-user-profile-pic"></div>
                <div className="username-name"></div>
                <div className="switch">
                  <span>Switch</span>
                </div>
              </div>
            </div>
          </suggest-section> */}

          {/* !home container */}
        </div>
      </div>
    </>
  );
};
