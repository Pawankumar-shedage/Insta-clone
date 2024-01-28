import { useEffect } from "react";
import { useAuth } from "../AuthContext/AuthProvider";
import { Footer } from "../Components/Common/Footer/Footer";
import { Posts } from "../Components/Posts/Posts";
import { Sidebar } from "../Components/Sidebar/Sidebar";
import Stories from "../Components/Stories/Stories";
import "/src/index.css";
import "/src/Styles/Home/Home.css";

export const Home = (props) => {
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

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
              <div className="stories-header">
                <Stories />
              </div>

              <div className="main-feed-section">
                <div className="feed">
                  {/* Posts = posts + reels videos.. */}
                  <Posts />
                </div>

                {/* Footer */}
                <div className="footer">
                  <Footer />
                </div>

                {/* !Main feed */}
              </div>
            </div>
          </section>

          <suggest-section>
            {/* Suggested profile section for desktop view */}
            <div className="suggested-profile-section">
              <div className="user-prof-current">
                <div className="current-user-profile-pic"></div>
                <div className="username-name"></div>
                <div className="switch">
                  <span>Switch</span>
                </div>
              </div>
            </div>
          </suggest-section>

          {/* !home container */}
        </div>
      </div>
    </>
  );
};
