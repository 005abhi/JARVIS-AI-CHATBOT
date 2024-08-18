import React from "react";
import ChatPage from "./pages/ChatPage";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FileUpload from "./pages/FileUpload";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/image" element={<FileUpload />} />
    </Routes>
  );
}

export default App;
