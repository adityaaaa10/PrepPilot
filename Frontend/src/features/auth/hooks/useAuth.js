import { AuthContext } from "../auth.context";
import * as authApi from "../services/auth.api";
import { useState, useContext } from "react";

export const useAuth = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const handleLogin = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authApi.login(credentials);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authApi.register(credentials);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      await authApi.logout();
      setUser(null);
    } catch (err) {
      setError(err?.response?.data?.message || "Logout failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchMe = async () => {
    setLoading(true);
    try {
      const data = await authApi.getMe();
      setUser(data?.user ?? null);
      return data;
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    handleLogin,
    handleRegister,
    handleLogout,
    fetchMe,
  };
};