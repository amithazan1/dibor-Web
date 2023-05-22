import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./forms/Login";
import Register from "./forms/Register";
import Chat from "./chat/Chat";
import { useState } from "react";
import './forms/form.css'

function App() {
  const [currentUser, setCurrentUser] = useState({});
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setCurrentUser={setCurrentUser} />} />
          <Route path="/Register" Component={Register} />
          <Route
            path="/chat"
            element={
              currentUser.username !== undefined ? (
                <Chat setCurrentUser={setCurrentUser} currentUser={currentUser} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
