/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../AuthContext/AuthProvider";
import "./ViewPostModal.css";
import { useFirebase } from "../../../FirebaseSetUp/FirebaseContext";

// eslint-disable-next-line no-unused-vars
export const ViewPostModal = ({ post }) => {
  const { currentUser } = useAuth();
  const { getUserById } = useFirebase();

  const [user, setUser] = useState(null);

  const getUserDetails = useCallback(async () => {
    const user = await getUserById(currentUser.uid);

    setUser(user);
  }, [currentUser.uid, getUserById]);

  useEffect(() => {
    const fetchData = async () => {
      await getUserDetails();
    };

    if (!user) fetchData();
  }, [getUserDetails, user]);

  console.log("CLickedpost", user);

  //   ------------------------------------------------------
  return (
    <div className="view-post-mount">
      <div className="view-post-container">
        <div className="vp-img-section">
          <img src={post.images[0]} alt="" />
        </div>
        <div className="vp-comment-section">
          {/* Header */}
          <div className="vp-cs-header">
            {/* User info */}
            <div className="vpcs-headerUserDetail">
              <div className="vpcs-header-profile-photo">DP</div>
              <div className="vpcs-header-profile-username">
                {user && user.username}
              </div>
            </div>

            {/* Post Setting */}
            <div className="vpcs-header-profile-postSettings">Settings</div>
          </div>

          <hr />

          {/* Post Caption */}
          <div className="vp-cs-postCaption">
            <div className="vpcs-postCaption-profilePhoto">DP</div>
            <div className="vpcs-postCaption-userName">
              {user && user.username}
            </div>
            <div className="vpcs-postCaption-caption">{post.caption}</div>
          </div>

          {/* Body */}
          <div className="vp-cs-commentsBody"></div>

          {/* Action buttons */}
          <div className="vp-cs-actionSection"></div>

          {/* Liked by users */}
          <div className="vp-cs-likedBy"></div>

          {/* Add comment */}
          <div className="vp-cs-addComment"></div>
        </div>
      </div>
    </div>
  );
};
