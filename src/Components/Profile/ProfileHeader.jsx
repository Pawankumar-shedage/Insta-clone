/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import "./Profile.css";
import "/src/index.css";
// icons
import { BsGearWide } from "react-icons/bs";
import { useFirebase } from "../../FirebaseSetUp/FirebaseContext";
import { useAuth } from "../../AuthContext/AuthProvider";

export const ProfileHeader = ({ user }) => {
  const { uploadProfilePhotos, updateProfilePhoto } = useFirebase();
  const { currentUser } = useAuth();

  const [dpUrl, setDPUrl] = useState(null);
  const profilePhotoRef = useRef();

  console.log(currentUser.uid);

  const handleProfileImage = () => {
    if (profilePhotoRef.current) {
      profilePhotoRef.current.click();
    }
    console.log(profilePhotoRef.current);
  };

  const handleImageFileChange = (e) => {
    console.log("Profile Img", e.target.files);

    const files = Array.from(e.target.files);

    for (const file of files) {
      if (file) {
        uploadProfilePhoto(file);
      }
    }
  };

  const uploadProfilePhoto = async (file) => {
    try {
      if (file && currentUser) {
        const imgUrl = await uploadProfilePhotos(file, currentUser.uid);

        setDPUrl(imgUrl);

        // now to set this url , accessible. ..
        await updateProfilePhoto(imgUrl, user.uid, user.username);
        console.log("Url", imgUrl);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  // --------------------------------------------------------
  return (
    <div className="profile-header">
      <div className="profile-pic-div">
        <img
          id="profile-image"
          title="upload picture"
          src={dpUrl ? dpUrl : " "}
          alt="profile-pic"
          role="button"
          onClick={handleProfileImage}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageFileChange}
          ref={profilePhotoRef}
          id="profile-image-input"
          style={{ display: "none" }}
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
