import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string;
  setError: (message: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.get<{ length: number }>(
        "http://192.168.0.51:3001/users",
        {
          params: { email, password },
        }
      );

      if (response.data.length > 0) {
        const token = "fake-jwt-token";
        await AsyncStorage.setItem("token", token);
        setIsAuthenticated(true);
        setError("");
      } else {
        setError("Credenciais inválidas!");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Erro ao tentar fazer login. Tente novamente mais tarde.");
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const clearError = () => {
    setError("");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, error, setError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
