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

            <div className="ms-3" role="button">
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
  );
};
