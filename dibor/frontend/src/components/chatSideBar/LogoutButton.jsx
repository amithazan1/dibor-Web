import React from "react";
import { LuLogOut } from "react-icons/lu";

import useLogout from "../../hooks/useLogout";

export default function LogoutButton() {
  const [loading, logout] = useLogout();

  return (
    <button className="btn m-1 rounded-circle" onClick={logout}>
      <LuLogOut />
    </button>
  );
}
