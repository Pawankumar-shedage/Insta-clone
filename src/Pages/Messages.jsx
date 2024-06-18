/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Link, useNavigate, useParams } from "react-router-dom";
import "/src/Styles/Messages/Messages.css";
import "/src/index.css";
import { useFirebase } from "../FirebaseSetUp/FirebaseContext";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../AuthContext/AuthProvider";
import { ChatComponent } from "../Components/Messages/ChatComponent";
import { serverTimestamp } from "firebase/firestore";
import { LoadingScreen } from "../Components/Common/Loading-Splash Screen/LoadingScreen";
import { MobileNavbar } from "./Mobile/Navbar/MobileNavbar";
import { MobileMsgChat } from "../Components/Messages/Mb_Chat/MobileMsgChat";
import { Sidebar } from "../Components/Sidebar/Sidebar";
import { SearchBar } from "../Components/Sidebar/SearchBar";

export const Messages = () => {
  // Firestore 🦺
  const { getUser, sendConversation, getUserById, getProfilePhoto } =
    useFirebase();

  const { userId } = useParams();
  // console.log("Current userin Messages.jx", userId);

  const [users, setUsers] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [toggleSearch, setToggleSearchBar] = useState(false);

  // Fetching users from firestore
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  // console.log("Selected User", selectedUser);
  // MAIN********
  const [conversationId, setConversationId] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await getUser();
        console.log(users);

        setUsers(users);

        await setUidProfilePicMap(users);

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

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      // console.log("isMobile", isMobile);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    getLoggedInUser();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ProfiePics

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

    // console.log("Logged User => ", user);
    setLoggedUser(user);
  };

  // START CHAT CONVERSATION.
  const handleStartChat = async (user) => {
    try {
      const conId = await getConversationId(user);

      setConversationId(conId);
      return conId;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // ----Profile Photo of user
  const uidProfilePicMap = useRef(new Map());

  const fetchProfilePic = async (userId) => {
    return await getProfilePhoto(userId);
  };

  const setUidProfilePicMap = async (users) => {
    try {
      const promises = users.map(async (user) => {
        const profilePic = await fetchProfilePic(user.author_uid);

        console.log(profilePic);
        if (profilePic)
          uidProfilePicMap.current.set(user.author_uid, profilePic);
      });

      await Promise.all(promises);
    } catch (error) {
      console.error("Error setting profile pictures: ", error);
    }
  };

  // console.log(uidProfilePicMap.current);

  // --------------------------

  // Send Msg btn-Filter Chat

  const [openModal, setOpenModal] = useState(true);
  const handleFilterChat = (e) => {
    setOpenModal(true);

    // --> search user, and select to start chat.
  };

  function handleDataFromSidebar(data) {
    console.log("data from sidebar", data);
    setToggleSearchBar(data.searchBar);
  }

  // ***IMP ***
  // Wait until users are initially loaded
  if (loading) {
    return <LoadingScreen />;
  }

  //-------------------------------------------------RETURN MESSAGES.jsx---------------------------------------------------
  return (
    <>
      <div className="messages-mount">
        {/* Sidebar [1] laptop*/}

        {!isMobile && (
          <div className="message-sidebar">
            <Sidebar sendDataToHome={handleDataFromSidebar} />
          </div>
        )}

        {/* SearchBar [1] */}
        {toggleSearch && <SearchBar users={users} />}

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

            {/* chat-profiles-****/}

            <div className="msg-profile-chats">
              {/* USER-profile */}
              {users.map((user, index) => {
                return (
                  <div
                    key={user.author_uid}
                    onClick={async (e) => {
                      console.log("clicked user", user);

                      try {
                        const conId = await handleStartChat(user);
                        setSelectedUser(user);

                        const profilePic = uidProfilePicMap.current.get(
                          user.author_uid
                        );

                        if (isMobile)
                          navigate("/messages/chat", {
                            state: {
                              selectedUser: user,
                              conversationId: conId,
                              profilePic: profilePic,
                            },
                          });
                      } catch (e) {
                        console.log(e);
                      }
                    }}
                    className="m-prof-container mb-3"
                    style={{ cursor: "pointer" }}
                  >
                    {/* User PROFILE PIC */}
                    <div className="msg-prof-profile-pic me-2">
                      <img
                        src={
                          uidProfilePicMap.current.get(user.uid) ||
                          "/assets/Images/User i/user.png"
                        }
                        alt="profile-pic"
                        width="100%"
                        height="100%"
                        style={{ border: "1px solid gray", color: "gray" }}
                        className="rounded-circle"
                      />
                    </div>

                    {/* USERNAME */}
                    <div className=" msg-profile-names">
                      <div className="username">
                        <span>{user.fullName}</span>
                      </div>
                      <div className="user-msg fw-light">
                        <small style={{ color: "gray" }}>
                          {/* <span>{user.fullName.split(" ")[0]}</span> sent an
                          attachment */}
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

          {isMobile && <MobileNavbar />}
        </div>

        {/* {selectedUser && isMobile && navigate("/messages/chat")} */}

        {/* Message-CHAT- [3] section, on click (2) */}
        <div className="message-chat">
          {/*  Chat Component */}

          {selectedUser ? (
            <ChatComponent
              selectedUser={selectedUser}
              conversationId={conversationId}
              profilePicSrc={uidProfilePicMap.current.get(selectedUser.uid)}
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
                <button className="btn btn-primary" onClick={handleFilterChat}>
                  Send Message
                </button>
              </div>
            </div>
          )}
        </div>

        {/* !message -mount */}
      </div>
    </>
  );
};
