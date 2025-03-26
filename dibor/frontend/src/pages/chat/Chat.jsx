import React from "react";
import SideBar from "../../components/chatSideBar/SideBar";
import MessageContainer from "../../components/chatBox/MessageContainer";

export default function Chat() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card w-75 h-75">
          <div className="row g-0 m-0 h-100">
            {/* side-bar */}
            <div className="col-5 h-100">
              <SideBar />
            </div>
            {/*chat-box*/}
            <div className="col-7 h-100 border-start">
              <MessageContainer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
