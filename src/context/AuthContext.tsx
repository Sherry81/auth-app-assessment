import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, use, useEffect, useState } from "react";
import { Alert } from "react-native";

type User = { name: string; email: string, password?: string };

type AuthContextType = {
  loggedInUser: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]); // In-memory user store 

  useEffect(() => {
    const loadLoggedInUser = async () => {
      const storedUser = await AsyncStorage.getItem("loggedInUser");
      if (storedUser) setLoggedInUser(JSON.parse(storedUser));
    };
    const loadAllUsers = async () => {
      const storedUsers = await AsyncStorage.getItem("users");
      if (storedUsers) setUsers(JSON.parse(storedUsers));
    };
    loadLoggedInUser();
    loadAllUsers();
  }, []);

  const login = async (email: string, password: string) => {
    const userExists = users.some(user => user.email === email && user.password === password);
    if (userExists) {
      const loggedUser = {...userExists && users.find(user => user.email === email && user.password === password)} as User;
      delete loggedUser.password; // Remove password before storing
      console.log({loggedUser})
      setLoggedInUser(loggedUser);
      await AsyncStorage.setItem("loggedInUser", JSON.stringify(loggedUser));
      return { success: true };
    }
    return { success: false, error: "Invalid credentials" };
  };

  const signup = async (name: string, email: string, password: string) => {
    if (!name || !email || !password) return { success: false, error: "All fields are required" };
    if (!/\S+@\S+\.\S+/.test(email)) return { success: false, error: "Invalid email format" };
    if (password.length < 6) return { success: false, error: "Password must be at least 6 characters" };

    const newUser = { name, email, password };
    setUsers([...users, newUser]);
    await AsyncStorage.setItem("users", JSON.stringify([...users, newUser]));
    return { success: true };
  };

  const logout = async () => {
    setLoggedInUser(null);
    await AsyncStorage.removeItem("loggedInUser");
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
