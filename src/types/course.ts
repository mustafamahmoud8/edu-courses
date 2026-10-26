export type CourseLevel = "beginner" | "intermediate" | "advanced";
export type CourseCategory =
  | "web-development"
  | "mobile"
  | "design"
  | "data-science"
  | "marketing"
  | "business"
  | "photography"
  | "music";

export type Lesson = {
  id: string;
  title: string;
  duration: string; // e.g. "12:34"
  videoUrl?: string;
  kind: "video" | "exam" | "pdf";
  isFree?: boolean;
  description?: string;
};

export type CourseSection = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  previewVideo?: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
    bio: string;
  };
  category: CourseCategory;
  level: CourseLevel;
  language: string;
  price: number; // in EGP
  originalPrice?: number;
  isFree?: boolean;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  duration: string; // total e.g. "24h 30m"
  lessonsCount: number;
  sections: CourseSection[];
  tags: string[];
  whatYouLearn: string[];
  requirements: string[];
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
};

export type CourseProgress = {
  courseId: string;
  userId: string;
  completedLessons: string[];
  lastLessonId?: string;
  progressPercent: number;
  startedAt: string;
  updatedAt: string;
};
