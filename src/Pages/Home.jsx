import { Sidebar } from "../Components/Sidebar/Sidebar";

export const Home = () => {
  return (
    <>
      <div className="home-mount-0">
        <div>
          {/* Action buttons section */}
          <div className="sidebar">
            <Sidebar />
          </div>

          {/* Right section (header + posts) */}
          <section>
            <div className="stories-header">
              <h1>THis</h1>
            </div>
            <div className="main-feed-section">
              <div className="feed"></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
