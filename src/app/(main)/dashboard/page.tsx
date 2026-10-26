"use client";

import Link from "next/link";
import { BookOpen, Clock, Award, TrendingUp, Play, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/contexts/ProgressContext";
import { COURSES } from "@/data/courses";
import { ASSIGNMENTS } from "@/data/courses";
import { CourseCard } from "@/components/courses/CourseCard";
import { calculateProgress } from "@/lib/utils";

export default function DashboardPage() {
  const { user } = useAuth();
  const { getProgress } = useProgress();

  const enrolledCourses = COURSES.filter((c) =>
    user?.purchasedCourses.includes(c.id)
  );

  const pendingAssignments = ASSIGNMENTS.filter((a) => a.status === "pending");

  const totalCompleted = enrolledCourses.reduce((acc, course) => {
    const p = getProgress(course.id);
    const total = course.sections.reduce((s, sec) => s + sec.lessons.length, 0);
    return acc + calculateProgress(p?.completedLessons ?? [], total);
  }, 0);

  const avgProgress =
    enrolledCourses.length > 0
      ? Math.round(totalCompleted / enrolledCourses.length)
      : 0;

  const stats = [
    {
      label: "الكورسات المسجّلة",
      value: enrolledCourses.length,
      icon: BookOpen,
      color: "text-primary bg-primary/10",
    },
    {
      label: "متوسط التقدم",
      value: `${avgProgress}%`,
      icon: TrendingUp,
      color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30",
    },
    {
      label: "واجبات معلّقة",
      value: pendingAssignments.length,
      icon: Clock,
      color: "text-amber-500 bg-amber-50 dark:bg-amber-950/30",
    },
    {
      label: "شهادات مكتسبة",
      value: 0,
      icon: Award,
      color: "text-green-500 bg-green-50 dark:bg-green-950/30",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="rounded-2xl bg-gradient-to-l from-primary/5 via-primary/10 to-primary/20 border border-primary/20 px-6 py-8">
        <h2 className="text-2xl font-bold text-foreground">
          أهلاً، {user?.name?.split(" ")[0]} 👋
        </h2>
        <p className="mt-1 text-muted-foreground">
          استمر في رحلة التعلم، أنت تتقدم بشكل رائع!
        </p>
        <Link
          href="/courses"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          <BookOpen size={16} />
          استكشف كورسات جديدة
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-2xl border border-border bg-card p-5 space-y-3"
          >
            <div className={`flex size-10 items-center justify-center rounded-xl ${color}`}>
              <Icon size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Enrolled courses */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">كورساتي</h3>
          <Link
            href="/courses"
            className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            استكشف المزيد <ArrowLeft size={14} />
          </Link>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center">
            <div className="mb-4 text-5xl">📚</div>
            <p className="font-semibold text-foreground">لم تسجّل في أي كورس بعد</p>
            <p className="text-sm text-muted-foreground">ابدأ رحلتك التعليمية الآن</p>
            <Link
              href="/courses"
              className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
            >
              تصفّح الكورسات
            </Link>
          </div>
        ) : (
          <div className="courses-grid">
            {enrolledCourses.map((course) => {
              const p = getProgress(course.id);
              const total = course.sections.reduce(
                (s, sec) => s + sec.lessons.length,
                0
              );
              const pct = calculateProgress(p?.completedLessons ?? [], total);
              return (
                <CourseCard
                  key={course.id}
                  course={course}
                  showProgress
                  progress={pct}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Pending assignments */}
      {pendingAssignments.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">واجبات معلّقة</h3>
            <Link
              href="/assignments"
              className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              عرض الكل <ArrowLeft size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {pendingAssignments.slice(0, 3).map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.courseTitle}</p>
                </div>
                <div className="mr-4 shrink-0 text-left">
                  <p className="text-xs text-muted-foreground">موعد التسليم</p>
                  <p className="text-sm font-semibold text-amber-500">{a.dueDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
