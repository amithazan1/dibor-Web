import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useSelectedChatContext } from "../context/SelectedChatContext";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const { setSelectedChat } = useSelectedChatContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.errors?.[0] || "Something went wrong");
      }

      localStorage.removeItem("chat-user");
      setAuthUser(null);
      setSelectedChat(null);
    } catch (error) {
      console.error("logout error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return [loading, logout];
};

export default useLogout;
