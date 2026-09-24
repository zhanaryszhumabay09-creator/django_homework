// AI-GENERATED: Qoder
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import api, { tokenStorage } from "../api/client";
import type { AuthUser } from "../types";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

export interface RegisterData {
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  password: string;
  password2: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    if (!tokenStorage.access) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await api.get<AuthUser>("/auth/me/");
      setUser(data);
    } catch {
      tokenStorage.clear();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (username: string, password: string) => {
    const { data } = await api.post("/auth/login/", { username, password });
    tokenStorage.set(data.access, data.refresh);
    await loadUser();
  };

  const register = async (payload: RegisterData) => {
    await api.post("/auth/register/", payload);
    const { data } = await api.post("/auth/login/", {
      username: payload.username,
      password: payload.password,
    });
    tokenStorage.set(data.access, data.refresh);
    await loadUser();
  };

  const logout = () => {
    tokenStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth должен использоваться внутри AuthProvider");
  return ctx;
}
