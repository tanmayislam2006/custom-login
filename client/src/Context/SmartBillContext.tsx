import { createContext, useContext } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  accessToken?: string;
  [key: string]: any;
}

export interface AuthContextType {
  googleLogIn: () => Promise<void>;
  createAccount: (userInfo: any) => Promise<any>;
  logInAccount: (email: string, password: string) => Promise<any>;
  logoutUser: () => void;
  loading: boolean;
  user: User | null;
}

const SmartBillContext = createContext<AuthContextType | null>(null);

export const useSmartBill = () => {
  const context = useContext(SmartBillContext);
  if (!context) {
    throw new Error("useSmartBill must be used within a SmartBillProvider");
  }
  return context;
};

export default SmartBillContext;
