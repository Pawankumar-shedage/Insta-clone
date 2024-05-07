import { IoIosMore } from "react-icons/io";
import { EmojiDrawer } from "../../Messages/EmojiDrawer";
import { useEffect, useRef, useState } from "react";

import "./ViewPostMobile.css";

/* eslint-disable react/prop-types */
export const ViewPostMobile = ({ user, post }) => {
  // Post Comment
  const [addComment, setAddComment] = useState("");

  const handlePostComment = (e) => {
    const comment = e.target.value;
    setAddComment(comment);
  };

  const [openEmojiDrawer, setOpenEmojiDrawer] = useState(false);

  const handleEmojiDrawer = (e) => {
    setOpenEmojiDrawer(!openEmojiDrawer);

    console.log("Emoji selected ", e.target);
  };

  const insertEmoji = (data) => {
    const emoji = data.native;
    setAddComment((prevComment) => prevComment + emoji);
  };
  const emojiRef = useRef();

  const handleCloseEmojiDrawer = (e) => {
    if (emojiRef.current && !emojiRef.current.contains(e.target)) {
      // if emoj drawer is open (ref is not null) && click is outside the emoji drawer
      setOpenEmojiDrawer(false);
    }
  };

  useEffect(() => {
    document
      .querySelector(".view-post-container")
      .addEventListener("click", handleCloseEmojiDrawer);
    return () => {
      document.removeEventListener("click", handleCloseEmojiDrawer);
    };
  }, []);

  //  -------------------------------------------------------------------
  return (
    <>
      <div className="vp-mobile">
        <div className="vpmb-header">
          {/* User info */}
          <div className="vpmb-headerUserDetail">
            <div className="vpmb-header-profile-photo">DP</div>
            <div className="vpmb-header-profile-username">
              {user && user.username}
            </div>

            {/* Post Setting */}
            <div className="vpmb-header-profile-postSettings">
              <span role="button" style={{ fontSize: "170%" }}>
                <IoIosMore />
              </span>
            </div>
          </div>
        </div>

        <div className="vpmb-img-section">
          <img src={post.images[0]} alt="post" />
        </div>

        <div className="vpmb-comment-section">
          {/* Body */}
          <div className="vpmb-commentsBody mt-3 ">
            {/* all other users comments, temp */}
            <div className="vpmb-postCaptionUserDetails">
              <div className="vpmb-postCaption-profilePhoto">DP</div>
              <div className="vpmb-postCaption-userName">
                <span>{user && user.username} </span>
              </div>
              <div className="vpmb-postCaption-caption ms-3 ">
                <span>{post.caption}</span>
              </div>
              <div id="vpmb-captionTimeStamp">
                <span>23 w</span>
                <span className="ms-3">likes</span>
                <span className="ms-3">Reply</span>
              </div>
            </div>
          </div>

          <hr />

          {/* Action buttons:  Like-Comment-Share     Bookmark*/}

          <div className="vpmb-actionBtns">
            <div className="vpmb-actionBtns-left">
              <div className="vpmb-actionBtn-like">
                <span id="post-likeBtn">
                  <svg
                    aria-label="Like"
                    fill="currentColor"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <title>Like</title>
                    <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                  </svg>
                </span>
              </div>
              <div className="vpmb-actionBtn-comment ms-3">
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
              <div className="vpmb-actionBtn-share ms-3">
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

            <div className="vpmb-actionBtns-bookmark">
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
          <div className="vp-cs-likedBy">
            <div className="vpmb-likedBy-likes  mt-2">
              <span className="ms-3">
                {/* last three people profile photos who liked the image */}
                <b>109 likes</b>
              </span>
            </div>
            <div className="vpmb-likedBy-postTimeStamp"></div>
          </div>

          {/* Post Caption */}
          <div className="vpmb-postCaption">
            <div className="vpmb-postCaptionUserDetails">
              <div className="vpmb-postCaption-profilePhoto">DP</div>
              <div className="vpmb-postCaption-userName">
                <span>{user && user.username} </span>
              </div>
              <div className="vpmb-postCaption-caption ms-3 ">
                <span>{post.caption}</span>
              </div>
              <div id="vpmb-captionTimeStamp">
                <span>23 w</span>
              </div>
            </div>
          </div>

          {/* Add comment */}
          <div className="vpmb-addComment mt-3">
            <div className="vpmb-addComment-userDp">DP</div>
            <div className="vpmb-addComment-comment">
              <textarea
                id="post-addComment"
                placeholder="Add a comment..."
                value={addComment}
                onChange={handlePostComment}
              ></textarea>
            </div>

            {addComment.length > 0 && (
              <div className="vpmb-addComment-postComment">
                <span id="addComment-postCommentBtn" role="button">
                  <b>Post</b>
                </span>
              </div>
            )}

            <div className="vpmb-addComment-emojiDrawer ms-2 me-2">
              <span id="addComment-emoji" onClick={handleEmojiDrawer}>
                <svg
                  aria-label="Emoji"
                  fill="currentColor"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <title>Emoji</title>
                  <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
                </svg>
              </span>

              {/* Open EMoji Drawer */}
              {openEmojiDrawer && (
                <div ref={emojiRef} className="vpmb-addComment-select-Emoji">
                  <div>
                    <EmojiDrawer
                      sendEmoji={(data) => insertEmoji(data)}
                      onChange={() => console.log("Changed emoji")}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};