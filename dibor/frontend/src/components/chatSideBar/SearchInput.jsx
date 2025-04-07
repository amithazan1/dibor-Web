import React from "react";

export default function SearchInput({ value, onChange }) {
  return (
    <>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          aria-label="search user"
          aria-describedby="search-button"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
        />
      </div>
    </>
  );
}
