import { IoChatbubbles } from "react-icons/io5";

import styles from "./chatBox.module.css";

export default function NoChatSelected() {
  return (
    <div
      className={`d-flex flex-column h-100 justify-content-center align-items-center ${styles["chat-background"]}`}
    >
      <div>
        <IoChatbubbles style={{ fontSize: "80px" }} />
      </div>
      <div className="m-3">Select Chat To Start Converstion</div>
    </div>
  );
}
