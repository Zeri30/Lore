"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { apiClient } from "@/lib/api";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  [key: string]: unknown;
}

interface AuthResponse {
  user: AuthUser;
  token: string;
}

export type AuthModalView = "login" | "register";

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  isAuthModalOpen: boolean;
  authModalView: AuthModalView;
  openAuthModal: (view?: AuthModalView) => void;
  closeAuthModal: () => void;
  setAuthModalView: (view: AuthModalView) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const TOKEN_STORAGE_KEY = "lore.auth.token";

function authHeaders(token: string | null) {
  return token ? { Authorization: `Bearer ${token}` } : undefined;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<AuthModalView>("login");

  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      const stored = window.localStorage.getItem(TOKEN_STORAGE_KEY);
      if (!stored) return;

      setToken(stored);
      try {
        const me = await apiClient.get<AuthUser>("/user", { headers: authHeaders(stored) });
        if (!cancelled) setUser(me);
      } catch {
        window.localStorage.removeItem(TOKEN_STORAGE_KEY);
        if (!cancelled) setToken(null);
      }
    }

    restoreSession().finally(() => {
      if (!cancelled) setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const persistSession = useCallback((data: AuthResponse) => {
    setUser(data.user);
    setToken(data.token);
    window.localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const data = await apiClient.post<AuthResponse>("/login", { email, password });
      persistSession(data);
    },
    [persistSession]
  );

  const register = useCallback(
    async (name: string, email: string, password: string, passwordConfirmation: string) => {
      const data = await apiClient.post<AuthResponse>("/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      persistSession(data);
    },
    [persistSession]
  );

  const logout = useCallback(async () => {
    if (token) {
      await apiClient
        .post("/logout", undefined, { headers: authHeaders(token) })
        .catch(() => {});
    }
    setUser(null);
    setToken(null);
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  }, [token]);

  const openAuthModal = useCallback((view: AuthModalView = "login") => {
    setAuthModalView(view);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => setIsAuthModalOpen(false), []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: user !== null,
      login,
      register,
      logout,
      isAuthModalOpen,
      authModalView,
      openAuthModal,
      closeAuthModal,
      setAuthModalView,
    }),
    [
      user,
      isLoading,
      login,
      register,
      logout,
      isAuthModalOpen,
      authModalView,
      openAuthModal,
      closeAuthModal,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
