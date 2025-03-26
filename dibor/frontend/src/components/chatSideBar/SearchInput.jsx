import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

import styles from "./chatSideBar.module.css";

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [clickedSearchIcon, setclickedSearchIcon] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  const handleClick = (e) => {
    setclickedSearchIcon((prev) => !prev);
  };

  return (
    <div className="d-flex align-items-center">
      {clickedSearchIcon && (
        <input
          type="text"
          className="form-control rounded-pill me-2"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
      )}
      <button className="btn m-1 rounded-circle" onClick={handleClick}>
        <FaSearch className={styles["search-icon"]} />
      </button>
    </div>
  );
}
