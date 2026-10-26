"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { CourseProgress } from "@/types/course";

type ProgressContextType = {
  getProgress: (courseId: string) => CourseProgress | undefined;
  markLessonComplete: (courseId: string, lessonId: string) => void;
  setLastLesson: (courseId: string, lessonId: string) => void;
};

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Record<string, CourseProgress>>({});

  useEffect(() => {
    const stored = localStorage.getItem("edu_progress");
    if (stored) {
      try {
        setProgress(JSON.parse(stored));
      } catch {
        /* ignore */
      }
    }
  }, []);

  const save = (updated: Record<string, CourseProgress>) => {
    setProgress(updated);
    localStorage.setItem("edu_progress", JSON.stringify(updated));
  };

  const getProgress = useCallback(
    (courseId: string) => progress[courseId],
    [progress]
  );

  const markLessonComplete = (courseId: string, lessonId: string) => {
    const existing = progress[courseId];
    const completed = existing
      ? [...new Set([...existing.completedLessons, lessonId])]
      : [lessonId];
    const updated: CourseProgress = {
      courseId,
      userId: "local",
      completedLessons: completed,
      lastLessonId: lessonId,
      progressPercent: 0, // will be recalculated at display
      startedAt: existing?.startedAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    save({ ...progress, [courseId]: updated });
  };

  const setLastLesson = (courseId: string, lessonId: string) => {
    const existing = progress[courseId];
    if (!existing) return;
    save({
      ...progress,
      [courseId]: { ...existing, lastLessonId: lessonId },
    });
  };

  return (
    <ProgressContext.Provider
      value={{ getProgress, markLessonComplete, setLastLesson }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
