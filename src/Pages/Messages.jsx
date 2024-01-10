/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Link, useParams } from "react-router-dom";
import "/src/Styles/Messages/Messages.css";
import "/src/index.css";
import { useFirebase } from "../FirebaseSetUp/FirebaseContext";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext/AuthProvider";
import { ChatComponent } from "../Components/Messages/ChatComponent";
import { serverTimestamp } from "firebase/firestore";

export const Messages = (props) => {
  // Firestore 🦺
  const { getUser, sendConversation, getUserById } = useFirebase();

  const { userId } = useParams();
  // console.log("Current userin Messages.jx", userId);

  // Users
  const [users, setUsers] = useState([]);

  // Single User
  const [loggedUser, setLoggedUser] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Fetching users from firestore
  const [selectedUser, setSelectedUser] = useState(null);

  // console.log("Selected User", selectedUser);
  // MAIN********
  const [conversationId, setConversationId] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await getUser();
        console.log(users);

        setUsers(users);
        setLoading(false);

        return users;
      } catch (error) {
        setLoading(false);
        console.log("Error in fetching users", error);
        throw error;
      }
    };
    //
    console.log("Users are loading Now");
    getUsers();

    // Single Logged in user
    getLoggedInUser();
  }, []);

  //-------------START CHAT WITH USER****

  // CONVERSATION ID
  const getConversationId = async (selectedUser) => {
    try {
      console.log(selectedUser.author_uid);

      const conversationData = {
        users: [userId, selectedUser.author_uid],
        timestamp: serverTimestamp(),
      };

      console.log("Inside getConversation Id");
      console.log(
        "Conversation Data: before sending:: ",
        conversationData.users
      );

      const conversationDocId = await sendConversation(conversationData);

      console.log("Con id", conversationDocId);

      return conversationDocId;
    } catch (error) {
      console.log("error fetching con id: ", error);
      throw error;
    }
  };

  // logged in USER
  const getLoggedInUser = async () => {
    const user = await getUserById(userId);

    console.log("Logged User => ", user);
    setLoggedUser(user[0]);
  };

  // START CHAT CONVERSATION.
  const handleStartChat = async (user) => {
    try {
      const conId = await getConversationId(user);
      setConversationId(conId);

      console.log("This User", user.fullName, "Con id", conId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // ***IMP ***
  // Wait until users are initially loaded
  if (loading) {
    return <div>Loading users...</div>;
  }

  //-------------------------------------------------RETURN MESSAGES.jsx---------------------------------------------------
  return (
    <>
      <div className="messages-mount">
        {/* Sidebar [1]*/}
        <div className="message-sidebar">
          <div className="message-top-btns">
            {/* insta-logo */}
            <div className="upper-insta-logo">
              <div>
                <span className="">
                  <img
                    src="/src/assets/IG_brand_asset_pack_2023/01 Static Glyph/02 White Glyph/Instagram_Glyph_White.png"
                    width={"24px"}
                    height={"24px"}
                    alt=""
                  />
                </span>
              </div>
            </div>

            {/* grp 1 */}
            <div className="sidebar-btn-grp-1">
              {/* Home */}
              <div className="navigation-logo-div">
                {/* Logo */}
                <div>
                  <Link className="sidebar-link">
                    <span>
                      <svg
                        aria-label="Home"
                        className="x1lliihq x1n2onr6 x5n08af"
                        fill="currentColor"
                        height="24px"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24px"
                        color="white"
                      >
                        <title>Home</title>
                        <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"></path>
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>

              {/* Search */}
              <div className="navigation-logo-div">
                {/* Logo */}
                <div>
                  <Link className="sidebar-link">
                    <span>
                      <svg
                        aria-label="Search"
                        className="x1lliihq x1n2onr6 x5n08af"
                        fill="currentColor"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
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
                    </span>
                  </Link>
                </div>
              </div>

              {/* Explore */}
              <div className="navigation-logo-div">
                {/* Logo */}
                <div>
                  <Link className="sidebar-link">
                    <span>
                      <svg
                        aria-label="Explore"
                        className="x1lliihq x1n2onr6 x5n08af"
                        fill="currentColor"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <title>Explore</title>
                        <polygon
                          fill="none"
                          points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></polygon>
                        <polygon
                          fillRule="evenodd"
                          points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"
                        ></polygon>
                        <circle
                          cx="12.001"
                          cy="12.005"
                          fill="none"
                          r="10.5"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></circle>
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>

              {/* Reels */}
              <div className="navigation-logo-div">
                {/* Logo */}
                <div>
                  <Link className="sidebar-link">
                    <span>
                      <svg
                        aria-label="Reels"
                        className="x1lliihq x1n2onr6 x5n08af"
                        fill="currentColor"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <title>Reels</title>
                        <line
                          fill="none"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          x1="2.049"
                          x2="21.95"
                          y1="7.002"
                          y2="7.002"
                        ></line>
                        <line
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          x1="13.504"
                          x2="16.362"
                          y1="2.001"
                          y2="7.002"
                        ></line>
                        <line
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          x1="7.207"
                          x2="10.002"
                          y1="2.11"
                          y2="7.002"
                        ></line>
                        <path
                          d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></path>
                        <path
                          d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>

              {/*Messages  */}
              <div className="navigation-logo-div">
                {/* Logo */}
                <div>
                  <Link className="sidebar-link" to="/messages">
                    <span>
                      <svg
                        aria-label="Messenger"
                        className="x1lliihq x1n2onr6 x5n08af"
                        fill="currentColor"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <title>Messenger</title>
                        <path d="M12.003 1.131a10.487 10.487 0 0 0-10.87 10.57 10.194 10.194 0 0 0 3.412 7.771l.054 1.78a1.67 1.67 0 0 0 2.342 1.476l1.935-.872a11.767 11.767 0 0 0 3.127.416 10.488 10.488 0 0 0 10.87-10.57 10.487 10.487 0 0 0-10.87-10.57Zm5.786 9.001-2.566 3.983a1.577 1.577 0 0 1-2.278.42l-2.452-1.84a.63.63 0 0 0-.759.002l-2.556 2.049a.659.659 0 0 1-.96-.874L8.783 9.89a1.576 1.576 0 0 1 2.277-.42l2.453 1.84a.63.63 0 0 0 .758-.003l2.556-2.05a.659.659 0 0 1 .961.874Z"></path>
                      </svg>
                      {/* Messages COUNT */}
                      <div className="messages-count">
                        <div className="count-badge">
                          <span className="count">2</span>
                        </div>
                      </div>
                    </span>
                  </Link>
                </div>
              </div>

              {/* Notifications */}
              <div className="navigation-logo-div">
                {/* Logo */}
                <div>
                  <Link className="sidebar-link">
                    <span>
                      <svg
                        aria-label="Notifications"
                        className="x1lliihq x1n2onr6 x5n08af"
                        fill="currentColor"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <title>Notifications</title>
                        <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>

              {/* Create - New Post*/}
              <div className="navigation-logo-div">
                {/* Logo */}
                <div>
                  <Link className="sidebar-link">
                    <span>
                      <svg
                        aria-label="New post"
                        className="x1lliihq x1n2onr6 x5n08af"
                        fill="currentColor"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <title>New post</title>
                        <path
                          d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
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
                          x1="6.545"
                          x2="17.455"
                          y1="12.001"
                          y2="12.001"
                        ></line>
                        <line
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          x1="12.003"
                          x2="12.003"
                          y1="6.545"
                          y2="17.455"
                        ></line>
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>

              {/*  Profile*/}
              <div className="navigation-logo-div">
                {/* Logo */}
                <div>
                  <Link className="sidebar-link">
                    <span>
                      <svg
                        aria-label="Notifications"
                        className="x1lliihq x1n2onr6 x5n08af"
                        fill="currentColor"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <title>Notifications</title>
                        <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>

              {/* !sidebtn grp 1 */}
            </div>
          </div>

          <div className="message-bttm-btns">
            {/* Group 2 - bottom btns */}
            <div className="sidebar-settings-pop-up">
              {/* More */}
              <div>
                <div>
                  <Link className="sidebar-link">
                    <span>
                      <svg
                        aria-label="Settings"
                        className="x1lliihq x1n2onr6 x5n08af"
                        fill="currentColor"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <title>Settings</title>
                        <line
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          x1="3"
                          x2="21"
                          y1="4"
                          y2="4"
                        ></line>
                        <line
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          x1="3"
                          x2="21"
                          y1="12"
                          y2="12"
                        ></line>
                        <line
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          x1="3"
                          x2="21"
                          y1="20"
                          y2="20"
                        ></line>
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
              {/* Bootom Btns */}
            </div>
          </div>
        </div>

        {/* Messages-Profiles [2]*/}
        <div className="message-profiles">
          <div className="msg-prof-container">
            {/* header */}
            <div className="msg-prof-header">
              <div>
                <Link className="nav-link">
                  <span className="fw-bold fs-5 pe-2">
                    {loggedUser.username}
                  </span>
                </Link>
                <Link className="nav-link">
                  <span className="pt-2">
                    <svg
                      aria-label="Down chevron icon"
                      className="x1lliihq x1n2onr6 x5n08af"
                      fill="currentColor"
                      height="12"
                      role="img"
                      viewBox="0 0 24 24"
                      width="12"
                    >
                      <title>Down chevron icon</title>
                      <path d="M12 17.502a1 1 0 0 1-.707-.293l-9-9.004a1 1 0 0 1 1.414-1.414L12 15.087l8.293-8.296a1 1 0 0 1 1.414 1.414l-9 9.004a1 1 0 0 1-.707.293Z"></path>
                    </svg>
                  </span>
                </Link>
              </div>
              <div>
                <Link className="nav-link">
                  <span>
                    <svg
                      aria-label="New message"
                      className="x1lliihq x1n2onr6 x5n08af"
                      fill="currentColor"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <title>New message</title>
                      <path
                        d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></path>
                      <path
                        d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z"
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
                        x1="16.848"
                        x2="20.076"
                        y1="3.924"
                        y2="7.153"
                      ></line>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>

            {/* messages heading */}
            <div className="msg-prof-heading d-flex flex-row justify-content-between mt-3">
              <div>
                <span className="fw-bold">Messages</span>
              </div>
              <div>
                <Link to="" className="text-decoration-none">
                  <span style={{ color: "blue" }}>
                    Requests (
                    <span className="requests-count" style={{ color: "blue" }}>
                      2
                    </span>
                    )
                  </span>
                </Link>
              </div>
            </div>

            {/* chat-profiles-*/}
            <div className="msg-profile-chats">
              {/* USER-profile */}
              {users.map((user, index) => {
                return (
                  <div
                    key={user.author_uid}
                    onClick={(e) => {
                      console.log("clicked user", user);
                      setSelectedUser(() => {
                        // Use the updated state to ensure it's the latest value
                        handleStartChat(user);

                        return user;
                      });
                    }}
                    className="d-flex flex-row mb-3"
                    style={{ cursor: "pointer" }}
                  >
                    {/* PROFILE PIC */}
                    <div className="msg-prof-profile-pic me-2">
                      <img
                        src="/src/assets/Images/French-Croissants.jpg"
                        alt="profile-pic"
                        width="100%"
                        height="100%"
                        className="rounded-circle"
                      />
                    </div>

                    {/* USERNAME */}
                    <div className="d-flex flex-column">
                      <div className="username">
                        <span>{user.fullName}</span>
                      </div>
                      <div className="user-msg fw-light">
                        <small style={{ color: "gray" }}>
                          <span>{user.fullName.split(" ")[0]}</span> sent an
                          attachment
                        </small>
                      </div>
                    </div>

                    {/*  */}
                  </div>
                );
              })}

              {/* !profile */}
            </div>
          </div>
        </div>

        {/* Message-CHAT- [3] section, on click (2) */}
        <div className="message-chat">
          {/*  Chat Component */}
          {selectedUser ? (
            <ChatComponent
              selectedUser={selectedUser}
              conversationId={conversationId}
            />
          ) : (
            // ({/* if profile is not selected] Base load ui send message btn */}
            <div className="msg-base">
              {/*  */}
              <div className="message-icon-big mb-3">
                <svg
                  aria-label=""
                  className="x1lliihq x1n2onr6 x5n08af"
                  fill="currentColor"
                  height="96"
                  role="img"
                  viewBox="0 0 96 96"
                  width="96"
                >
                  <title></title>
                  <path d="M48 0C21.532 0 0 21.533 0 48s21.532 48 48 48 48-21.532 48-48S74.468 0 48 0Zm0 94C22.636 94 2 73.364 2 48S22.636 2 48 2s46 20.636 46 46-20.636 46-46 46Zm12.227-53.284-7.257 5.507c-.49.37-1.166.375-1.661.005l-5.373-4.031a3.453 3.453 0 0 0-4.989.921l-6.756 10.718c-.653 1.027.615 2.189 1.582 1.453l7.257-5.507a1.382 1.382 0 0 1 1.661-.005l5.373 4.031a3.453 3.453 0 0 0 4.989-.92l6.756-10.719c.653-1.027-.615-2.189-1.582-1.453ZM48 25c-12.958 0-23 9.492-23 22.31 0 6.706 2.749 12.5 7.224 16.503.375.338.602.806.62 1.31l.125 4.091a1.845 1.845 0 0 0 2.582 1.629l4.563-2.013a1.844 1.844 0 0 1 1.227-.093c2.096.579 4.331.884 6.659.884 12.958 0 23-9.491 23-22.31S60.958 25 48 25Zm0 42.621c-2.114 0-4.175-.273-6.133-.813a3.834 3.834 0 0 0-2.56.192l-4.346 1.917-.118-3.867a3.833 3.833 0 0 0-1.286-2.727C29.33 58.54 27 53.209 27 47.31 27 35.73 36.028 27 48 27s21 8.73 21 20.31-9.028 20.31-21 20.31Z"></path>
                </svg>
              </div>

              {/*  */}
              <div className="mb-2">
                <span className="fw-bold fs-5">Your Messages</span>
              </div>

              {/*  */}
              <div className="mb-3">
                <span>
                  Send private photos and messages to a friend or group{" "}
                </span>
              </div>

              <div>
                {/* To open modal with select person to msg. */}
                <button className="btn btn-primary">Send Message</button>
              </div>
            </div>
          )}
        </div>

        {/* !message -mount */}
      </div>
    </>
  );
};
