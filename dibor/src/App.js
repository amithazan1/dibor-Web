import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./forms/Login";
import Register from "./forms/Register";
import Chat from "./chat/Chat";
import { useState } from "react";
import './forms/form.css'
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3001/');

function App() {
  const [token, setToken] = useState("");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setToken={setToken} />} />
          <Route path="/Register" Component={Register} />
          <Route
            path="/chat"
            element={
              token != 0 ? (
                <Chat socket={socket} setToken={setToken} token={token} />
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
