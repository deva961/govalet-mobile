import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import * as LocalAuthentication from "expo-local-authentication";

export const API_URL = "http://10.0.0.226:3000/api";
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

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true); // initial loading state
  const [session, setSession] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/auth/sign-in/email`, {
        email,
        password,
      });

      console.log("logindata:", data);

      console.log("token:", data.token);

      await SecureStore.setItemAsync(TOKEN_KEY, data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      setSession(true);
      setUser(data.user);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to sign in. Try again later.";
      Alert.alert("Authentication Error", message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    const { data } = await axios.post(`${API_URL}/auth/sign-out`);
    console.log("signout:", data);
    setUser(null);
    setSession(false);
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    delete axios.defaults.headers.common["Authorization"];
  };

  // Automatically try to restore session on app load
  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);

        if (token) {
          const hasHardware = await LocalAuthentication.hasHardwareAsync();
          const supportedTypes =
            await LocalAuthentication.supportedAuthenticationTypesAsync();
          const isEnrolled = await LocalAuthentication.isEnrolledAsync();

          if (hasHardware && isEnrolled) {
            const result = await LocalAuthentication.authenticateAsync({
              promptMessage: "Authenticate to continue",
              fallbackLabel: "Use Passcode",
            });

            if (!result.success) {
              console.log("Biometric auth failed or cancelled.");
              setLoading(false);
              return;
            }
          }

          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const { data } = await axios.get(`${API_URL}/auth/get-session`);

          console.log("user fetch session:", data.session);
          setUser(data.user);
          setSession(true);
        }
      } catch (error) {
        console.log("Session restore failed:", error);
        await signOut();
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  const contextData: AuthContextType = {
    login,
    signOut,
    user,
    session,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <SafeAreaView className="flex-1 items-center justify-center">
          <Text>Loading...</Text>
        </SafeAreaView>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
