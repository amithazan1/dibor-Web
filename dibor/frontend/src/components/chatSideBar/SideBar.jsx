import { useState } from "react";
import SearchInput from "./SearchInput";
import ChatList from "./ChatList";
import TopBar from "./TopBar";

import useGetChats from "../../hooks/useGetChats";
import useListenChats from "../../hooks/useListenChats";
import { useChatsContext } from "../../context/ChatsContext";
import useSearchFilter from "../../hooks/useSearchFilter";

export default function SideBar() {
  useListenChats();
  const { loading } = useGetChats();
  const { chats } = useChatsContext();

  const [searchTerm, setSearchTerm] = useState("");

  const usersInfo = chats.map((chat) => {
    return chat.chatWith;
  });

  const filteredChats = useSearchFilter(usersInfo, searchTerm, "displayName");
  console.log("chatsInfo", usersInfo);

  return (
    <div>
      <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ChatList loading={loading} chats={filteredChats} />
    </div>
  );
}
