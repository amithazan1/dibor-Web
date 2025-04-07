import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SelectedChatContextProvider } from "./context/SelectedChatContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import { ChatsContextProvider } from "./context/ChatsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="top-center" reverseOrder={false} />
    <AuthContextProvider>
      <SelectedChatContextProvider>
        <SocketContextProvider>
          <ChatsContextProvider>
            <App />
          </ChatsContextProvider>
        </SocketContextProvider>
      </SelectedChatContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
