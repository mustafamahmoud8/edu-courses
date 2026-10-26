"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, AuthState } from "@/types/user";

type AuthContextType = AuthState & {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  purchaseCourse: (courseId: string) => void;
  hasPurchased: (courseId: string) => boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USERS: User[] = [
  {
    id: "u1",
    name: "مصطفى محمود",
    email: "mustafa@example.com",
    role: "student",
    enrolledCourses: ["1", "2"],
    purchasedCourses: ["1", "2"],
    createdAt: "2024-01-01",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const stored = localStorage.getItem("edu_user");
    if (stored) {
      try {
        const user = JSON.parse(stored) as User;
        setState({ user, isAuthenticated: true, isLoading: false });
      } catch {
        setState({ user: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      setState((s) => ({ ...s, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800));
    const found = DEMO_USERS.find((u) => u.email === email);
    if (found && password.length >= 6) {
      localStorage.setItem("edu_user", JSON.stringify(found));
      setState({ user: found, isAuthenticated: true, isLoading: false });
      return true;
    }
    // Also allow any email/password for demo
    if (password.length >= 6) {
      const newUser: User = {
        id: `u-${Date.now()}`,
        name: email.split("@")[0],
        email,
        role: "student",
        enrolledCourses: [],
        purchasedCourses: [],
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem("edu_user", JSON.stringify(newUser));
      setState({ user: newUser, isAuthenticated: true, isLoading: false });
      return true;
    }
    return false;
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 1000));
    if (password.length >= 6) {
      const newUser: User = {
        id: `u-${Date.now()}`,
        name,
        email,
        role: "student",
        enrolledCourses: [],
        purchasedCourses: [],
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem("edu_user", JSON.stringify(newUser));
      setState({ user: newUser, isAuthenticated: true, isLoading: false });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("edu_user");
    setState({ user: null, isAuthenticated: false, isLoading: false });
  };

  const purchaseCourse = (courseId: string) => {
    if (!state.user) return;
    const updated: User = {
      ...state.user,
      purchasedCourses: [...new Set([...state.user.purchasedCourses, courseId])],
      enrolledCourses: [...new Set([...state.user.enrolledCourses, courseId])],
    };
    localStorage.setItem("edu_user", JSON.stringify(updated));
    setState((s) => ({ ...s, user: updated }));
  };

  const hasPurchased = (courseId: string): boolean => {
    return state.user?.purchasedCourses.includes(courseId) ?? false;
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, register, logout, purchaseCourse, hasPurchased }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
