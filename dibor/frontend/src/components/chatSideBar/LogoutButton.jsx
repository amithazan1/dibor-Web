import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { RiLogoutCircleRLine } from "react-icons/ri";

import useLogout from "../../hooks/useLogout";

export default function LogoutButton() {
  const [loading, logout] = useLogout();

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id="logout">logout</Tooltip>}
    >
      <button className="btn rounded-circle" onClick={logout}>
        <RiLogoutCircleRLine />
      </button>
    </OverlayTrigger>
  );
}
