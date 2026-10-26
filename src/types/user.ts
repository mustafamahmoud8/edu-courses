export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "student" | "instructor" | "admin";
  enrolledCourses: string[];
  purchasedCourses: string[];
  createdAt: string;
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};
