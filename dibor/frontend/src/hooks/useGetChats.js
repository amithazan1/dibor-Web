import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetChats = () => {
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/user/getChats");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.errors?.[0] || data.message || "Something went wrong"
          );
        }

        setChats(data.users);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getChats();
  }, []); // Runs once on mount

  return { loading, chats, setChats };
};

export default useGetChats;
