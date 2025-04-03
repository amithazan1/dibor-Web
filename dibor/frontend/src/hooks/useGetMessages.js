import { useState } from "react";
import toast from "react-hot-toast";

import { useSelectedChatContext } from "../context/SelectedChatContext";

export const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { setMessages } = useSelectedChatContext();

  const getMessages = async (receiverId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/chat/getAllMessages/${receiverId}`);
      const data = await res.json();

      if (!res.ok) {
        setMessages([]);
        throw new Error(
          data.errors?.[0] || data.message || "Something went wrong"
        );
      }

      setMessages(data.messages);
    } catch (error) {
      console.error("error in sending message:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, getMessages };
};
