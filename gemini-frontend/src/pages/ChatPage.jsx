import React from "react";
import Chat from "../components/Chat";
import backgroundVideo from "../../video/jarvis.mp4";
import "../App.css";

const ChatPage = () => {
  return (
    <div className="w-full h-screen bg-transparent">
      <video autoPlay loop muted id="background-video">
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <Chat />
    </div>
  );
};

export default ChatPage;
