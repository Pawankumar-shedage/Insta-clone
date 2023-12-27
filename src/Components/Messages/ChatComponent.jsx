/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./ChatComponent.css";
import "/src/index.css";

export const ChatComponent = ({ selectedUser }) => {
  console.log(selectedUser);
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
                <span className="fw-normal">Soham More</span>
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
        <div className="d-block">
          <div className="send-message">
            <div>
              <div>ds</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
