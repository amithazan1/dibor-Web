import { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { CgSearchLoading } from "react-icons/cg";

import logo from "/logo.png";
import styles from "./chatSideBar.module.css";

import SearchInput from "./SearchInput";
import LogoutButton from "./LogoutButton";
import AddChatButton from "./AddChatButton";

export default function TopBar({ searchTerm, setSearchTerm }) {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => setShowSearch((prev) => !prev);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center border-bottom flex-wrap">
        {/* Left: Logo + App Name */}
        <div className="d-flex align-items-center gap-2 flex-shrink-0">
          <img src={logo} className={styles.logo} alt="logo" />
          <span className="fw-bold fs-5">Dibor</span>
        </div>
        {/* Right: Buttons */}
        <div className="d-flex align-items-center gap-2 mt-2 mt-sm-0 flex-wrap justify-content-end">
          {showSearch && (
            <div style={{ maxWidth: "160px" }}>
              <SearchInput value={searchTerm} onChange={setSearchTerm} />
            </div>
          )}
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="find chat">find chat</Tooltip>}
          >
            <button
              className="btn btn-sm rounded-circle"
              aria-label="search"
              onClick={toggleSearch}
            >
              <CgSearchLoading size={20} />
            </button>
          </OverlayTrigger>
          <AddChatButton />
          <LogoutButton />
        </div>
      </div>
    </>
  );
}
