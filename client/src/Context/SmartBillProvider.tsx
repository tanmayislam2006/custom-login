import React, { useEffect, useState, ReactNode } from "react";
import SmartBillContext, { User, AuthContextType } from "./SmartBillContext";
import axios from "axios";

interface SmartBillProviderProps {
  children: ReactNode;
}

const SmartBillProvider: React.FC<SmartBillProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  const googleLogIn = async () => {
    // Placeholder or implementation if backend supports Google Auth
    console.warn("Google Login not implemented in backend yet");
  };

  const createAccount = async (userInfo: any) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/auth/register", userInfo);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logInAccount = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/auth/login", { email, password });
      const { data } = response.data;

      // Store token and user info
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data));

      setUser(data);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user data", e);
        logoutUser();
      }
    }
    setLoading(false);
  }, []);

  const information: AuthContextType = {
    googleLogIn,
    createAccount,
    logInAccount,
    logoutUser,
    loading,
    user,
  };

  return <SmartBillContext.Provider value={information}>{children}</SmartBillContext.Provider>;
};

export default SmartBillProvider;
