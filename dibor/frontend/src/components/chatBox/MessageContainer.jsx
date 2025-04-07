import UserTop from "./UserTop";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import NoChatSelected from "./NoChatSelected";
import { useSelectedChatContext } from "../../context/SelectedChatContext";

export default function MessageContainer() {
  const { selectedChat, setSelectedChat } = useSelectedChatContext();
  return !selectedChat ? (
    <NoChatSelected />
  ) : (
    <div className="d-flex flex-column h-100">
      <UserTop {...selectedChat} />
      <Messages />
      <MessageInput />
    </div>
  );
}
