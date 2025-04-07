import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetAllUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/user/getAllUsers");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.errors?.[0] || data.message || "Something went wrong"
          );
        }

        setUsers(data.users);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []); // Runs once on mount

  return { loading, users };
};

export default useGetAllUsers;
