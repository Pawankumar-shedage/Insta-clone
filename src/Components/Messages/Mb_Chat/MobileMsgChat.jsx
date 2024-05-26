import { useLocation } from "react-router-dom";
import { ChatComponent } from "../ChatComponent";
import "../ChatComponent.css";
import "./MobileMsgChat.css";

export const MobileMsgChat = () => {
  const location = useLocation();
  const { selectedUser, conversationId, profilePic } = location.state || {};

  console.log("Location stat", profilePic);

  return (
    <div className="mb-chat-container">
      <ChatComponent
        selectedUser={selectedUser}
        conversationId={conversationId}
        profilePicSrc={profilePic}
      />
    </div>
  );
};
