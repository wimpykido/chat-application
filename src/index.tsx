import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ThemeProvider from "./context/theme-provider";
import { ChatContextProvider } from "./context/chat-context";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ChatContextProvider>
        <App />
      </ChatContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
