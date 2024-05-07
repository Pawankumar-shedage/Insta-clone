/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import "./MobileHomePage.css";
import "/src/index.css";

// ICONS
import { RxCrossCircled } from "react-icons/rx";
import { EmojiDrawer } from "../../../Components/Messages/EmojiDrawer";

export const MobileHomePage = ({ posts }) => {
  // -----------Search bar - header
  const [searchInput, setSearchInput] = useState(" ");
  const inputRef = useRef();
  const [showSearchItem, setShowSearchItem] = useState(true);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchBarClick = () => {
    setShowSearchItem(false);
    inputRef.current.focus();
  };

  const handleClearSearch = (e) => {
    setSearchInput("");
  };

  //   -------------------------!Searchbar------------------------------

  //   ----------Post Like

  const [postLiked, setPostLiked] = useState(false);

  //   ------------Posts---------

  // ------------------------------------------------------------------------
  return (
    <div className="mb-home-container">
      {/* Header */}
      <div className="mb-home-header">
        <div className="mbhh-logo">
          <img
            src="/src/assets/IG_brand_asset_pack_2023/01 Static Glyph/02 White Glyph/Instagram_Glyph_White.png"
            alt="Insta logo"
          />
        </div>

        <div className="mbhh-search" onClick={handleSearchBarClick}>
          <input
            ref={inputRef}
            id="mbh-search-input"
            type="text"
            value={searchInput}
            onChange={handleSearchInput}
            onBlur={() => {
              if (searchInput.length === 0) setShowSearchItem(true);
            }}
          />

          <div
            style={{ display: showSearchItem ? "block" : "none" }}
            id="mbh-search-icon"
          >
            <svg
              aria-label="Search"
              fill="currentColor"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="15"
            >
              <title>Search</title>
              <path
                d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="16.511"
                x2="22"
                y1="16.511"
                y2="22"
              ></line>
            </svg>
          </div>
          <div
            style={{ display: showSearchItem ? "block" : "none" }}
            id="mbh-search-placeholder"
          >
            Search
          </div>
          <div
            id="mbh-clear-search-input"
            onClick={handleClearSearch}
            style={{ display: showSearchItem ? "none" : "block" }}
          >
            <RxCrossCircled />
          </div>
        </div>

        <div className="mbhh-notifications">
          <span>
            <svg
              aria-label="Notifications"
              className="x1lliihq x1n2onr6 x5n08af"
              fill="currentColor"
              role="img"
              //   width={"60%"}
              //   height={"70%"}
              viewBox="0 0 24 24"
            >
              <title>Notifications</title>
              <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
            </svg>
          </span>
        </div>
      </div>

      {/* Stories */}

      {/* POSTS */}
      <div className="mbhome-post-container">
        {posts.map((post, index) => (
          <div className="mb-home-post mt-3" key={index}>
            <div className="mbhome-post-header">
              <div className="mbhph-user-info">
                <div className="mbhph-dp">DP</div>
                <div className="mbhph-username">{post.username}</div>
              </div>

              <div className="mbhph-post-settings">
                <svg
                  aria-label="More options"
                  fill="currentColor"
                  role="img"
                  viewBox="0 0 24 24"
                >
                  <title>More options</title>
                  <circle cx="12" cy="12" r="1.5"></circle>
                  <circle cx="6" cy="12" r="1.5"></circle>
                  <circle cx="18" cy="12" r="1.5"></circle>
                </svg>
              </div>
            </div>
            <div className="mbhome-post-image">
              <img src={post.images[0]} alt="image" width={"100%"} />
            </div>

            {/* Post footer -> Action btns,caption,add comment */}
            <div className="mbhome-post-footer">
              <div className="mbhome-post-actionBtns">
                <div className="mbhome-post-actionBtns-left">
                  <div
                    className="vpmb-actionBtn-like"
                    onClick={() => setPostLiked(!postLiked)}
                  >
                    <span id="post-likeBtn">
                      {postLiked ? (
                        <svg
                          aria-label="Unlike"
                          fill="red"
                          height="24"
                          role="img"
                          viewBox="0 0 48 48"
                          width="24"
                        >
                          <title>Unlike</title>
                          <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                        </svg>
                      ) : (
                        <svg
                          aria-label="Like"
                          fill="currentColor"
                          height="24"
                          width="24"
                          role="img"
                          viewBox="0 0 24 24"
                        >
                          <title>Like</title>
                          <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                        </svg>
                      )}
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

                <div className="mbhome-post-actionBtns-bookmark">
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
                  <span className="ms-4">
                    {/* last three people profile photos who liked the image */}
                    <b>
                      <small>109 likes</small>
                    </b>
                  </span>
                </div>
                <div className="vpmb-likedBy-postTimeStamp"></div>
              </div>

              {/* Post Caption */}
              <div className="mbhome-post-caption">
                <div className="mbpost-caption-userDetails">
                  <div className="vpmb-postCaption-userName">
                    <span>
                      <b>{post.username}</b>{" "}
                    </span>
                  </div>
                  <div className="vpmb-postCaption-caption ms-3 ">
                    <span>{post.caption}</span>
                  </div>
                </div>
              </div>

              {/* Add comment */}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}

      {/* Sidebar-horizontal (mobile) */}
      <div className="mb-home-bottom-sidebar">ff</div>
    </div>
  );
};