/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../AuthContext/AuthProvider";
import "./ViewPostModal.css";
import "/src/index.css";
import { useFirebase } from "../../../FirebaseSetUp/FirebaseContext";

// icons
import { IoIosMore } from "react-icons/io";

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
          <img src={post.images[0]} alt="post" />
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

              {/* Post Setting */}
              <div className="vpcs-header-profile-postSettings">
                <span role="button" style={{ fontSize: "170%" }}>
                  <IoIosMore />
                </span>
              </div>
            </div>
          </div>

          <hr />

          {/* Post Caption */}
          <div className="vp-cs-postCaption">
            <div className="vpcs-postCaptionUserDetails">
              <div className="vpcs-postCaption-profilePhoto">DP</div>
              <div className="vpcs-postCaption-userName">
                <span>{user && user.username} </span>
              </div>
              <div className="vpcs-postCaption-caption ms-3 ">
                <span>{post.caption}</span>
              </div>
              <div id="vpcs-captionTimeStamp">
                <span>23 w</span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="vp-cs-commentsBody mt-3 ">
            {/* all other users comments, temp */}
            <div className="vpcs-postCaptionUserDetails">
              <div className="vpcs-postCaption-profilePhoto">DP</div>
              <div className="vpcs-postCaption-userName">
                <span>{user && user.username} </span>
              </div>
              <div className="vpcs-postCaption-caption ms-3 ">
                <span>{post.caption}</span>
              </div>
              <div id="vpcs-captionTimeStamp">
                <span>23 w</span>
                <span className="ms-3">likes</span>
                <span className="ms-3">Reply</span>
              </div>
            </div>
          </div>

          <hr />

          {/* Action buttons:  Like-Comment-Share     Bookmark*/}

          <div className="vp-cs-actionBtns">
            <div className="vpcs-actionBtns-left">
              <div className="vpcs-actionBtn-like">
                <span id="post-likeBtn">
                  <svg
                    aria-label="Unlike"
                    fill="currentColor"
                    height="24"
                    role="img"
                    viewBox="0 0 48 48"
                    width="24"
                  >
                    <title>Unlike</title>
                    <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                  </svg>
                </span>
              </div>
              <div className="vpcs-actionBtn-comment ms-3">
                <span id="post-commentBtn">
                  <svg
                    aria-label="Comment"
                    fill="currentColor"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <title>Comment</title>
                    <path
                      d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </span>
              </div>
              <div className="vpcs-actionBtn-share ms-3">
                <span id="post-shareBtn">
                  <svg
                    aria-label="Share Post"
                    fill="currentColor"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <title>Share Post</title>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="22"
                      x2="9.218"
                      y1="3"
                      y2="10.083"
                    ></line>
                    <polygon
                      fill="none"
                      points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></polygon>
                  </svg>
                </span>
              </div>
            </div>

            <div className="vpcs-actionBtns-bookmark">
              <span id="post-bookmarkBtn">
                <svg
                  aria-label="Save"
                  fill="currentColor"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <title>Save</title>
                  <polygon
                    fill="none"
                    points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></polygon>
                </svg>
              </span>
            </div>
          </div>

          {/* Liked by users */}
          <div className="vp-cs-likedBy"></div>

          {/* Add comment */}
          <div className="vp-cs-addComment"></div>
        </div>
      </div>
    </div>
  );
};
