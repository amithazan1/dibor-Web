import React from "react";

import logo from "/logo.png";
import styles from "./chatSideBar.module.css";

import SearchInput from "./SearchInput";
import LogoutButton from "./LogoutButton";

export default function TopBar() {
  return (
    <>
      <div className="container border-bottom">
        <div className="row">
          <div className="col-auto">
            <img src={logo} className={styles.logo} />
            Dibor
          </div>
          <div className="col-auto align-items-end">
            <SearchInput />
          </div>
          <div className="col-auto align-items-end">
            <LogoutButton />
          </div>
        </div>
      </div>
    </>
  );
}
