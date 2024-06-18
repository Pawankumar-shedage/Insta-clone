import { useNavigate } from "react-router-dom";
import { useProfilePhotoOfCurrUser } from "../../../Components/Profile/ProfilePhotoContext/ProfilePhotoContext";
import "./MbNavbar.css";
import { useAuth } from "../../../AuthContext/AuthProvider";
import { useState } from "react";
import { CreateNewPost } from "../../../Components/Posts/CreateNewPost";
import { Modal } from "../../../Components/Modal/Modal";

export const MobileNavbar = () => {
  const { dpCurrUser } = useProfilePhotoOfCurrUser();
  const { currentUser } = useAuth();

  // CreatePost Modal
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const navigate = useNavigate();
  // /----------------------------
  return (
    <>
      <div className="mb-home-footer">
        {/* Home */}
        <div onClick={() => navigate("/home")}>
          <svg
            aria-label="Home"
            fill="currentColor"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <title>Home</title>
            <path
              d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z"
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </svg>
        </div>

        {/* Explore */}
        <div>
          <svg
            aria-label="Explore"
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
        </div>

        {/* Reels */}
        <div>
          <svg
            aria-label="Reels"
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
        </div>

        {/* New Post */}
        <div className="mb-footer-createPost-btn" onClick={openModal}>
          <svg
            aria-label="New post"
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
        </div>

        {/* Messages */}
        <div
          className="mb-footer-message-btn"
          onClick={() => {
            const userId = currentUser.uid;
            navigate(`/messages/${userId}`);
          }}
        >
          <svg
            aria-label="Messenger"
            fill="currentColor"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <title>Messenger</title>
            <path
              d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="1.739"
            ></path>
            <path
              d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z"
              fillRule="evenodd"
            ></path>
          </svg>

          <div className="mb-footer-messages-count">
            <div className="mb-msg-count-badge">
              <span className="span-msg-count">2</span>
            </div>
          </div>
        </div>

        {/* Profile */}
        <div
          className="mb-footer-profile-btn"
          onClick={() => {
            const userId = currentUser.uid;
            console.log();
            navigate(`/profile/${userId}`);
          }}
        >
          <span>
            {dpCurrUser ? (
              <img
                src={dpCurrUser}
                alt="profile-pic"
                width={"60%"}
                height={"60%"}
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Profile</title>
                <circle
                  cx="50"
                  cy="50"
                  r="28"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </svg>
            )}
          </span>
        </div>
      </div>

      {/* Create Post Modal */}
      {modalOpen && (
        <Modal closeModal={closeModal}>
          <CreateNewPost />
        </Modal>
      )}
    </>
  );
};
