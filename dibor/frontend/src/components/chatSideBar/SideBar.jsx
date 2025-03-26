import React from "react";
import SearchInput from "./SearchInput";
import UserList from "./UserList";
import TopBar from "./TopBar";

export default function SideBar() {
  return (
    <div className="">
      <TopBar />
      <UserList />
    </div>
  );
}
