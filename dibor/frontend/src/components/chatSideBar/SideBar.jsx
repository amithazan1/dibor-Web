import React from "react";
import SearchInput from "./SearchInput";
import ChatList from "./ChatList";
import TopBar from "./TopBar";

export default function SideBar() {
  return (
    <div className="">
      <TopBar />
      <ChatList />
    </div>
  );
}
