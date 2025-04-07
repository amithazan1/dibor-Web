import { useState } from "react";
import { CgSearchLoading } from "react-icons/cg";

import logo from "/logo.png";
import styles from "./chatSideBar.module.css";

import SearchInput from "./SearchInput";
import LogoutButton from "./LogoutButton";
import AddChatButton from "./AddChatButton";

export default function TopBar() {
  const [clickedSearchIcon, setclickedSearchIcon] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClick = (e) => {
    setclickedSearchIcon((prev) => !prev);
  };
  return (
    <>
      <div className="d-flex justify-content-between border-bottom">
        <div>
          <img src={logo} className={styles.logo} />
          Dibor
        </div>
        <div className="d-flex">
          <AddChatButton />
          <LogoutButton />
          {clickedSearchIcon && (
            <SearchInput value={searchTerm} onChange={setSearchTerm} />
          )}
          <button
            className="btn rounded-circle rounded-circle"
            aria-label="search"
            onClick={handleClick}
          >
            <CgSearchLoading />
          </button>
        </div>
      </div>
    </>
  );
}
