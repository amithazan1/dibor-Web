import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAuthContext } from "../context/AuthContext";
import { useChatsContext } from "../context/ChatsContext";

const useGetChats = () => {
  const [loading, setLoading] = useState(false);
  const { chats, setChats } = useChatsContext();
  const { authUser } = useAuthContext();

  useEffect(() => {
    const getChats = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/chat/getChats");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.errors?.[0] || data.message || "Something went wrong"
          );
        }

        const chats = data.map((chat) => {
          let otherUser = chat.participants.find(
            (user) => user._id != authUser.id
          );
          if (!otherUser) {
            otherUser = chat.participants[0];
          }
          return { id: chat.id, chatWith: otherUser };
        });

        setChats(chats);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getChats();
  }, []);

  return { loading };
};

export default useGetChats;
