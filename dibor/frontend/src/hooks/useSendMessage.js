import { useState } from "react";

import { useSelectedChatContext } from "../context/SelectedChatContext";

export const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedChat, messages, setMessages } = useSelectedChatContext();

  const sendMessage = async (content) => {
    setLoading(true);
    try {
      const res = await fetch("/api/message/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: selectedChat._id, content: content }),
      });

      const data = await res.json();
      console.log("data=", data.message);

      if (!res.ok) {
        throw new Error(data.errors?.[0] || "Something went wrong");
      }

      setMessages([...messages, data.message]);
    } catch (error) {
      console.error("error in sending message:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};
