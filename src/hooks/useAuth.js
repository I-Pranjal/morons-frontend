// hooks/useAuth.js
import { useState } from "react";
import axios from "axios";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const saveSession = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const signIn = async ({ email, password }) => {
    console.log("Signing in with", email);
    try {
      setLoading(true);
      const res = await axios.post("https://genios-backend.onrender.com/user/signin", { email, password });
      saveSession(res.data.token, res.data.user);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || "Sign in failed");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async ({ name, email, password }) => {
    console.log("Signing up with", name, email);
    try {
      setLoading(true);
      const res = await axios.post("https://genios-backend.onrender.com/user/signup", { name, email, password });
      saveSession(res.data.token, res.data.user);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || "Sign up failed");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return { signIn, signUp, logout, loading, error };
}
