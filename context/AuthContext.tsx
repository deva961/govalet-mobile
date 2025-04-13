import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import * as LocalAuthentication from "expo-local-authentication";

export const API_URL = "https://govalet-backend.vercel.app/api";
const TOKEN_KEY = "TOKEN_KEY";

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  session: boolean;
  login: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const defaultAuthContext: AuthContextType = {
  user: null,
  session: false,
  login: async () => {},
  signOut: async () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Prevent auto-hiding the splash screen
SplashScreen.preventAutoHideAsync().catch(() => {});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [appReady, setAppReady] = useState(false);
  const [session, setSession] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/sign-in/email`, {
        email,
        password,
      });

      await SecureStore.setItemAsync(TOKEN_KEY, data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      setSession(true);
      setUser(data.user);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to sign in. Try again later.";
      Alert.alert("Authentication Error", message);
      throw error;
    }
  };

  // const signOut = async () => {
  //   try {
  //     await axios.post(`${API_URL}/auth/sign-out`);
  //     setUser(null);
  //     setSession(false);
  //     await SecureStore.deleteItemAsync(TOKEN_KEY);
  //     delete axios.defaults.headers.common["Authorization"];
  //   } catch (error) {
  //     console.log("Sign out error:", error);
  //   }
  // };

  const signOut = async () => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        await axios.post(`${API_URL}/auth/sign-out`);
      }
    } catch (error) {
      console.log("Sign out API call skipped or failed:", error);
    } finally {
      setUser(null);
      setSession(false);
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // Restore session on app start
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);

        if (!token) {
          await signOut();
          return; // <--- Important: stop execution here
        }

        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (hasHardware && isEnrolled) {
          const result = await LocalAuthentication.authenticateAsync({
            promptMessage: "Authenticate to continue",
            fallbackLabel: "Use Passcode",
          });

          if (!result.success) return;
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const { data } = await axios.get(`${API_URL}/auth/get-session`);

        if (data?.user) {
          setUser(data.user);
          setSession(true);
        } else {
          await signOut();
        }
      } catch (error: any) {
        console.log("Restore failed:", error?.response?.data || error.message);
        await signOut();
      } finally {
        setAppReady(true);
        SplashScreen.hideAsync();
      }
    };

    restoreSession();
  }, []);

  const contextData: AuthContextType = {
    login,
    signOut,
    user,
    session,
  };

  if (!appReady) return null; // Don't render anything until app is ready

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
