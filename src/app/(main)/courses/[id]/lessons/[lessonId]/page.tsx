"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, ChevronRight, ChevronLeft,
  List, Play, FileText, Award, Menu, X
} from "lucide-react";
import { COURSES } from "@/data/courses";
import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/contexts/ProgressContext";
import { calculateProgress, cn } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LessonPage() {
  const { id, lessonId } = useParams<{ id: string; lessonId: string }>();
  const router = useRouter();
  const { isAuthenticated, hasPurchased } = useAuth();
  const { getProgress, markLessonComplete } = useProgress();
  const [curriculumOpen, setCurriculumOpen] = useState(false);

  const course = COURSES.find((c) => c.id === id);
  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="text-lg font-semibold">الكورس غير موجود</p>
        <Link href="/courses" className="mt-4 text-primary hover:underline">العودة</Link>
      </div>
    );
  }

  const purchased = hasPurchased(course.id);
  const allLessons = course.sections.flatMap((s) => s.lessons);
  const currentLesson = allLessons.find((l) => l.id === lessonId);
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const progress = getProgress(course.id);
  const progressPercent = calculateProgress(progress?.completedLessons ?? [], allLessons.length);
  const isCompleted = progress?.completedLessons.includes(lessonId) ?? false;

  if (!currentLesson) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="text-lg font-semibold">الدرس غير موجود</p>
        <Link href={`/courses/${id}`} className="mt-4 text-primary hover:underline">العودة للكورس</Link>
      </div>
    );
  }

  if (!purchased && !currentLesson.isFree) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center space-y-4">
        <div className="text-6xl">🔒</div>
        <h2 className="text-xl font-bold text-foreground">هذا الدرس مدفوع</h2>
        <p className="text-muted-foreground">اشترك في الكورس للوصول إلى هذا الدرس</p>
        <Link
          href={`/courses/${id}`}
          className="rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90"
        >
          عرض الكورس
        </Link>
      </div>
    );
  }

  const handleComplete = () => {
    markLessonComplete(course.id, lessonId);
    toast.success("تم تسجيل إكمال الدرس ✅");
    if (nextLesson) {
      setTimeout(() => router.push(`/courses/${id}/lessons/${nextLesson.id}`), 600);
    }
  };

  return (
    <div className="flex flex-col gap-0 -m-4 md:-m-6 min-h-[calc(100dvh-4rem)]">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3 md:px-6">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href={`/courses/${id}`}
            className="flex items-center gap-1.5 shrink-0 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowRight size={16} />
            <span className="hidden sm:inline">الكورس</span>
          </Link>
          <span className="text-muted-foreground">/</span>
          <h1 className="truncate text-sm font-semibold text-foreground">{currentLesson.title}</h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Progress */}
          <div className="hidden items-center gap-2 sm:flex">
            <div className="h-1.5 w-28 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-primary">{progressPercent}%</span>
          </div>

          {/* Curriculum toggle */}
          <button
            onClick={() => setCurriculumOpen(!curriculumOpen)}
            className="flex items-center gap-1.5 rounded-xl border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition"
          >
            {curriculumOpen ? <X size={15} /> : <List size={15} />}
            <span className="hidden sm:inline">المحتوى</span>
          </button>
        </div>
      </div>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Video + content */}
        <div className={cn("flex flex-1 flex-col overflow-y-auto", curriculumOpen && "lg:border-l lg:border-border")}>
          {/* Video / Exam / PDF area */}
          <div className="bg-black">
            {currentLesson.kind === "video" ? (
              <div className="aspect-video w-full bg-black flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-white/60">
                  <div className="flex size-20 items-center justify-center rounded-full border-2 border-white/20">
                    <Play size={36} className="ml-1 text-white" />
                  </div>
                  <p className="text-sm">مشغّل الفيديو</p>
                  <p className="text-xs opacity-50">{currentLesson.title}</p>
                </div>
              </div>
            ) : currentLesson.kind === "pdf" ? (
              <div className="aspect-video w-full bg-gray-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-white/60">
                  <FileText size={48} />
                  <p className="text-sm">ملف PDF</p>
                </div>
              </div>
            ) : (
              <div className="aspect-video w-full bg-blue-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-white/60">
                  <Award size={48} />
                  <p className="text-sm">اختبار الوحدة</p>
                </div>
              </div>
            )}
          </div>

          {/* Lesson info */}
          <div className="flex-1 space-y-6 p-4 md:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-foreground">{currentLesson.title}</h2>
                {currentLesson.duration && (
                  <p className="text-sm text-muted-foreground">⏱ {currentLesson.duration}</p>
                )}
              </div>

              {/* Complete button */}
              <button
                onClick={handleComplete}
                disabled={isCompleted}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all",
                  isCompleted
                    ? "bg-primary/10 text-primary cursor-default"
                    : "bg-primary text-white hover:bg-primary/90"
                )}
              >
                <CheckCircle2 size={16} />
                {isCompleted ? "مكتمل ✓" : "تسجيل كمكتمل"}
              </button>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between border-t border-border pt-4">
              {prevLesson ? (
                <Link
                  href={`/courses/${id}/lessons/${prevLesson.id}`}
                  className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
                >
                  <ChevronRight size={16} />
                  الدرس السابق
                </Link>
              ) : <div />}

              {nextLesson && (
                <Link
                  href={`/courses/${id}/lessons/${nextLesson.id}`}
                  className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary/90"
                >
                  الدرس التالي
                  <ChevronLeft size={16} />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Curriculum sidebar */}
        {curriculumOpen && (
          <div className="hidden w-80 shrink-0 overflow-y-auto border-r border-border bg-card lg:block">
            <div className="p-4 border-b border-border">
              <p className="font-semibold text-foreground">محتوى الكورس</p>
              <p className="text-xs text-muted-foreground">{progressPercent}% مكتمل</p>
            </div>
            {course.sections.map((section) => (
              <div key={section.id}>
                <div className="bg-secondary px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {section.title}
                  </p>
                </div>
                {section.lessons.map((lesson) => {
                  const completed = progress?.completedLessons.includes(lesson.id);
                  const isCurrentLesson = lesson.id === lessonId;
                  return (
                    <Link
                      key={lesson.id}
                      href={`/courses/${id}/lessons/${lesson.id}`}
                      className={cn(
                        "flex items-center gap-3 border-b border-border px-4 py-3 text-sm transition",
                        isCurrentLesson
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-secondary"
                      )}
                    >
                      <div className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-full",
                        completed ? "bg-primary text-white" : "border border-border"
                      )}>
                        {completed ? <CheckCircle2 size={12} /> :
                          lesson.kind === "exam" ? <Award size={10} /> :
                            lesson.kind === "pdf" ? <FileText size={10} /> :
                              <Play size={10} />}
                      </div>
                      <span className="line-clamp-2">{lesson.title}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
