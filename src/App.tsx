import React from "react";
import { SignUp } from "./pages/sign-up";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/sign-in";
import ChatPage from "./pages/chat-page";
import { PrivateRoute } from "./components/private-route";
import AccessControl from "./pages/access-control";

const App = () => {
  return (
    <BrowserRouter  basename="/chat-application">
      <Routes>
        <Route path="/" element={<Navigate to="/sign-in" />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/*" element={<AccessControl />} />
        {/* <Route path='/chat' element={<ChatPage />} /> */}
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
