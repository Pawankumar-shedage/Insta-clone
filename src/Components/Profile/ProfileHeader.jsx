/* eslint-disable react/prop-types */
import "./Profile.css";
import "/src/index.css";
// icons
import { BsGearWide } from "react-icons/bs";

export const ProfileHeader = ({ user }) => {
  return (
    <div className="profile-header">
      <div className="profile-pic-div">
        <img
          id="profile-image"
          src="/src/assets/Images/French-Croissants.jpg"
          alt="profile-pic"
        />
      </div>
      <div className="profile-user-details">
        <div className="user-main-info ">
          <div className="user-name">
            <span className="">{user && user.username}</span>
          </div>

          <div className="user-action-btns">
            <button>Edit Profile</button>

            <div className="ms-3" role="button">
              <BsGearWide />
            </div>
          </div>
        </div>

        <div className="user-info">
          <div>
            <span>23 posts</span>
          </div>

          <div>
            <span>23 followers</span>
          </div>

          <div>
            <span>23 following</span>
          </div>
        </div>

        <div className="user-fullname mt-3">
          <span>{user && user.fullName}</span>
        </div>

        <div className="user-bio mt-3">
          <p>✋🏻</p>
        </div>
      </div>

      {/* !header */}
    </div>
  );
};
