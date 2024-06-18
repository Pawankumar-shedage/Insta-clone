/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import "./Profile.css";
import "/src/index.css";
// icons
import { BsGearWide } from "react-icons/bs";
import { useFirebase } from "../../FirebaseSetUp/FirebaseContext";
import { useAuth } from "../../AuthContext/AuthProvider";
import { useProfilePhotoOfCurrUser } from "./ProfilePhotoContext/ProfilePhotoContext";

export const ProfileHeader = ({ user }) => {
  // console.log("Prof header user", user);

  const { uploadProfilePhotos, setProfilePhoto, getProfilePhoto } =
    useFirebase();
  const { currentUser } = useAuth();
  const { dpCurrUser, setDpCurrUser: setGlobalProfilePhoto } =
    useProfilePhotoOfCurrUser();

  const [loading, setLoading] = useState(false);
  const profilePhotoRef = useRef();

  useEffect(() => {
    const getDp = async (userId) => {
      setLoading(true);
      await getProfilePhotoByID(userId);
      setLoading(false);
    };

    const userId = user.uid || user.author_uid;
    getDp(userId);
  }, []);
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
    setLoading(true);
    try {
      if (file && currentUser) {
        const imgUrl = await uploadProfilePhotos(file, currentUser.uid);

        // now to set this url , accessible. ..
        await setProfilePhoto(imgUrl, user.uid);

        setGlobalProfilePhoto(imgUrl);
        // get Updated/Uploaded photo

        await getProfilePhotoByID(user.uid);

        console.log("Url", imgUrl);
      }
    } catch (e) {
      console.log("error", e);
    } finally {
      setLoading(false);
    }
  };

  const getProfilePhotoByID = async (userId) => {
    const dp = await getProfilePhoto(userId);
    setGlobalProfilePhoto(dp);
  };

  // console.log("DPURL", dpUrl);

  // --------------------------------------------------------
  return (
    <div className="profile-header">
      <div className="profile-pic-div">
        {loading ? (
          <img
            id="profile-image-loading"
            title="loading profile picture"
            src="/assets/Images/Loading images/loading_circles_blue_gradient.jpg"
            alt="profile-pic"
          />
        ) : (
          <img
            id="profile-image"
            title="upload picture"
            src={dpCurrUser ? dpCurrUser : "/assets/Images/User i/user.png"}
            alt="profile-picture11"
            role="button"
            onClick={handleProfileImage}
          />
        )}

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
            <span>
              <b>23</b> posts
            </span>
          </div>

          <div>
            <span>
              <b>23</b> followers
            </span>
          </div>

          <div>
            <span>
              <b>23</b> following
            </span>
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
