import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext/AuthProvider";
import { useFirebase } from "../../FirebaseSetUp/FirebaseContext";
import { Sidebar } from "../Sidebar/Sidebar";
import "./Profile.css";
import "/src/index.css";
// icons
import { BsGearWide } from "react-icons/bs";

export const Profile = () => {
  const { currentUser } = useAuth();
  const { getUserById } = useFirebase();

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const user = await getUserById(currentUser.uid);
      setUser(user);
      setLoading(false);
    } catch (e) {
      console.log("Error getting user: ", e);
      throw new error();
    }
  };

  useEffect(() => {
    console.log("Function called");
    getUser();
  }, []);

  // Loading screen
  if (loading) return <div className="text-center">Loading profile</div>;

  console.log(user);

  // -----------------RETURN-------
  return (
    <div className="profile-mount">
      <div className="profile-container">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <Sidebar />
        </div>
        {/* profile-display section */}
        <div className="profile-display ">
          <div className="profile-header">
            <div className="profile-pic-div">
              <img
                src="/src/assets/Images/French-Croissants.jpg"
                alt="profile-pic"
                height={"150px"}
                width={"150px"}
              />
            </div>
            <div className="profile-user-details">
              <div className="d-flex flex-row">
                <div className="user-name">
                  <span className="fs-5 ">{user.username}</span>
                </div>

                <div className="user-action-btns">
                  <button>Edit Profile</button>
                  {/* <button className="btn btn-secondary">Edit Profile</button> */}
                  {/* <button className="btn btn-secondary">Edit Profile</button> */}

                  <div className="ms-3">
                    <BsGearWide style={{ fontSize: "24px" }} />
                  </div>
                </div>
              </div>

              <div className="user-info">
                <div>23 posts</div>
                <div>23 followers</div>
                <div>23 following</div>
              </div>

              <div className="user-fullname mt-3">
                <span>{user.fullName}</span>
              </div>

              <div className="user-bio mt-3">
                <p>✋🏻</p>
              </div>
            </div>

            {/* !header */}
          </div>

          {/* Highlights (later to be added) */}
          <div className="user-highlights">
            <div>
              <img
                src="/src/assets/Images/French-Croissants.jpg"
                height={"100%"}
                width={"100%"}
                alt="highlight"
              />
            </div>
            <div>
              <img
                src="/src/assets/Images/French-Croissants.jpg"
                height={"100%"}
                width={"100%"}
                alt="highlight"
              />
            </div>
            <div>
              <img
                src="/src/assets/Images/French-Croissants.jpg"
                height={"100%"}
                width={"100%"}
                alt="highlight"
              />
            </div>
            <div>
              <img
                src="/src/assets/Images/French-Croissants.jpg"
                height={"100%"}
                width={"100%"}
                alt="highlight"
              />
            </div>
            <div>
              <img
                src="/src/assets/Images/French-Croissants.jpg"
                height={"100%"}
                width={"100%"}
                alt="highlight"
              />
            </div>
            <div>
              <img
                src="/src/assets/Images/French-Croissants.jpg"
                height={"100%"}
                width={"100%"}
                alt="highlight"
              />
            </div>
            <div>
              <img
                src="/src/assets/Images/French-Croissants.jpg"
                height={"100%"}
                width={"100%"}
                alt="highlight"
              />
            </div>
            <div>
              <img
                src="/src/assets/Images/French-Croissants.jpg"
                height={"100%"}
                width={"100%"}
                alt="highlight"
              />
            </div>
          </div>

          {/* Posts */}
          <div className="user-posts-container d-flex flex-row justify-content-center">
            {/* to add posts,saved,archived options bar */}

            <div className="user-posts">
              <div>
                <img
                  src="/src/assets/Images/French-Croissants.jpg"
                  height={"100%"}
                  width={"100%"}
                  alt="post"
                />
              </div>
              <div>
                <img
                  src="/src/assets/Images/French-Croissants.jpg"
                  height={"100%"}
                  width={"100%"}
                  alt="post"
                />
              </div>
              <div>
                <img
                  src="/src/assets/Images/French-Croissants.jpg"
                  height={"100%"}
                  width={"100%"}
                  alt="post"
                />
              </div>
              <div>
                <img
                  src="/src/assets/Images/French-Croissants.jpg"
                  height={"100%"}
                  width={"100%"}
                  alt="post"
                />
              </div>
              <div>
                <img
                  src="/src/assets/Images/French-Croissants.jpg"
                  height={"100%"}
                  width={"100%"}
                  alt="post"
                />
              </div>
              <div>
                <img
                  src="/src/assets/Images/French-Croissants.jpg"
                  height={"100%"}
                  width={"100%"}
                  alt="post"
                />
              </div>
              <div>
                <img
                  src="/src/assets/Images/French-Croissants.jpg"
                  height={"100%"}
                  width={"100%"}
                  alt="post"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
