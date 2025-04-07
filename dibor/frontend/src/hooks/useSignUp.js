import React, { useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

import { useAuthContext } from "../context/AuthContext";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async (userData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.errors?.[0] || "Something went wrong");
      }
      localStorage.setItem(
        "chat-user",
        JSON.stringify({ username: data.username, id: data._id })
      );
      setAuthUser({ username: data.username, id: data._id });

      toast.success("User created");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return [loading, signup];
};

export default useSignUp;
