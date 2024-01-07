/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./ChatComponent.css";
import "/src/index.css";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../AuthContext/AuthProvider";
import { collection, serverTimestamp } from "firebase/firestore";
import { useFirebase } from "../../FirebaseSetUp/FirebaseContext";

export const ChatComponent = ({ selectedUser, conversationId }) => {
  // get current logged in user
  const { currentUser } = useAuth();

  // FIREBASE 🦺
  const {
    sendConversation,
    addMessageToConversation,
    fetchMessagesFromAConversation: fetchMessages,
  } = useFirebase();

  const [textMessage, setTextMessage] = useState("");

  const textareaRef = useRef();

  // adding messages in conversation.
  // 1.conversationId 2.Message Data
  const messageData = {
    sender: currentUser.uid,
    content: textMessage,
    timestamp: serverTimestamp(),
  };

  const addNewMessage = async () => {
    try {
      console.log(
        "inside addNewMessage",
        conversationId,
        ",   MessageData: ",
        messageData
      );

      const message = await addMessageToConversation(
        conversationId,
        messageData
      );
      console.log("Message sent successfully,Message doc id ", message);

      return message;
    } catch (error) {
      console.log("Error occurred while adding message : ", error);
    }
  };

  // GET MESSAGES
  const [messages, setMessages] = useState([]);

  const getMessages = async (conversationId) => {
    try {
      const result = await fetchMessages(conversationId);

      console.log("Fetched Messages", result);

      setMessages(result);
    } catch (error) {
      console.error("Error :", error);
      throw error;
    }
  };

  console.log("Messages", messages);

  //-----
  const handleTextMessage = async (e) => {
    setTextMessage(e.target.value);
    console.log(e.target.value);
  };

  // KEY PRESS

  const handleKeyDown = (e) => {
    console.log(e);

    // To enter line break
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      // Insert a line break at the current cursor position
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;

      textarea.value = value.substring(0, start) + "\n" + value.substring(end);
      console.log("THIS", value);
      // Set the cursor position after the inserted line break
      textarea.setSelectionRange(start + 1, start + 1);
    }
    // TO send message on ENTER
    else if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    console.log("getMessages called");
    getMessages(conversationId);
  }, []);

  const sendMessage = async (e) => {
    if (e) {
      e.preventDefault();
    }

    await addNewMessage();

    // await getMessages();
    // console.log(e);message
    setTextMessage("");
    return "success";
  };
  // ---------------------------------Return
  return (
    <>
      <div className="chat-mount">
        {/* user-name */}
        <div className="chat-header">
          <div className="d-flex flex-row">
            {/* profile-pic */}
            <div className="msg-prof-profile-pic me-1">
              <Link className="">
                <img
                  src="/src/assets/Images/French-Croissants.jpg"
                  alt="profile-pic"
                  width="80%"
                  height="80%"
                  className="rounded-circle"
                />
              </Link>
            </div>

            {/*  */}
            <div className="d-flex flex-column justify-content-center align-items-center">
              <Link className="nav-link">
                <span className="fw-normal">{selectedUser.fullName}</span>
              </Link>

              {/* Conditional render afterwards- Active status */}
              {/* <span>
                <small className=" fw-light">Active 12 min ago</small>
              </span> */}
            </div>
          </div>

          {/* Info btn */}
          <div className="d-flex flex-row justify-content-center align-items-center">
            <Link className="nav-link">
              <span>
                <svg
                  aria-label="Conversation information"
                  className="x1lliihq x1n2onr6 x5n08af"
                  fill="currentColor"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <title>Conversation information</title>
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
                  <circle cx="11.819" cy="7.709" r="1.25"></circle>
                  <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    x1="10.569"
                    x2="13.432"
                    y1="16.777"
                    y2="16.777"
                  ></line>
                  <polyline
                    fill="none"
                    points="10.569 11.05 12 11.05 12 16.777"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></polyline>
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* content chat */}
        <div className="chat-content-main"></div>

        {/* Send message input */}
        <div className="send-message">
          <div>
            <div className="d-flex flex-row justify-content-between align-items-center">
              {/* Emojis */}
              <div>
                <span>
                  <svg
                    aria-label="Choose an emoji"
                    className="x1lliihq x1n2onr6 x5n08af"
                    fill="currentColor"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <title>Choose an emoji</title>
                    <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
                  </svg>
                </span>
              </div>
            </div>
            {/* Message */}
            <div className="ms-3 me-3 form-floating input-msg">
              {/* MESSAGE-INPUT */}
              <textarea
                className=""
                placeholder="Message..."
                id="floatingTextarea"
                ref={textareaRef}
                value={textMessage}
                onKeyDown={handleKeyDown}
                onChange={(e) => handleTextMessage(e)}
              ></textarea>
            </div>

            {textMessage.length > 0 && textMessage != "" ? (
              <div>
                <Link
                  role="button"
                  className=""
                  style={{ textDecoration: "none" }}
                  onClick={(e) => sendMessage(e)}
                >
                  Send
                </Link>
              </div>
            ) : (
              // {/* right side */}
              <div className="d-flex flex-row justify-content-between align-items-center">
                {/* mic */}
                <div className="ms-3">
                  <span>
                    <svg
                      aria-label="Voice Clip"
                      className="x1lliihq x1n2onr6 x5n08af"
                      fill="currentColor"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <title>Voice Clip</title>
                      <path
                        d="M19.5 10.671v.897a7.5 7.5 0 0 1-15 0v-.897"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></path>
                      <line
                        fill="none"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        x1="12"
                        x2="12"
                        y1="19.068"
                        y2="22"
                      ></line>
                      <line
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        x1="8.706"
                        x2="15.104"
                        y1="22"
                        y2="22"
                      ></line>
                      <path
                        d="M12 15.745a4 4 0 0 1-4-4V6a4 4 0 0 1 8 0v5.745a4 4 0 0 1-4 4Z"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></path>
                    </svg>
                  </span>
                </div>

                {/* photos */}
                <div className="ms-3">
                  <span>
                    <svg
                      aria-label="Add Photo or Video"
                      className="x1lliihq x1n2onr6 x5n08af"
                      fill="currentColor"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <title>Add Photo or Video</title>
                      <path
                        d="M6.549 5.013A1.557 1.557 0 1 0 8.106 6.57a1.557 1.557 0 0 0-1.557-1.557Z"
                        fillRule="evenodd"
                      ></path>
                      <path
                        d="m2 18.605 3.901-3.9a.908.908 0 0 1 1.284 0l2.807 2.806a.908.908 0 0 0 1.283 0l5.534-5.534a.908.908 0 0 1 1.283 0l3.905 3.905"
                        fill="none"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></path>
                      <path
                        d="M18.44 2.004A3.56 3.56 0 0 1 22 5.564h0v12.873a3.56 3.56 0 0 1-3.56 3.56H5.568a3.56 3.56 0 0 1-3.56-3.56V5.563a3.56 3.56 0 0 1 3.56-3.56Z"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></path>
                    </svg>
                  </span>
                </div>

                {/* like */}
                <div className="ms-3">
                  <span>
                    <svg
                      aria-label="Like"
                      className="x1lliihq x1n2onr6 x5n08af"
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
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
