"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight, Star, Clock, Users, BookOpen,
  Globe, Award, CheckCircle2, Lock, Play, FileText,
  ChevronDown, ChevronUp, ShoppingCart
} from "lucide-react";
import { COURSES } from "@/data/courses";
import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/contexts/ProgressContext";
import { formatPrice, calculateProgress } from "@/lib/utils";
import { PaymobButton } from "@/components/payment/PaymobButton";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { isAuthenticated, hasPurchased } = useAuth();
  const { getProgress } = useProgress();
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(["s1"]));

  const course = COURSES.find((c) => c.id === id);
  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <div className="text-5xl mb-4">😕</div>
        <p className="text-lg font-semibold text-foreground">الكورس غير موجود</p>
        <Link href="/courses" className="mt-4 text-primary hover:underline">
          العودة للكورسات
        </Link>
      </div>
    );
  }

  const purchased = hasPurchased(course.id);
  const progress = getProgress(course.id);
  const totalLessons = course.sections.reduce((acc, s) => acc + s.lessons.length, 0);
  const completedCount = progress?.completedLessons.length ?? 0;
  const progressPercent = calculateProgress(progress?.completedLessons ?? [], totalLessons);

  const toggleSection = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const levelLabel: Record<string, string> = { beginner: "مبتدئ", intermediate: "متوسط", advanced: "متقدم" };
  const categoryLabel: Record<string, string> = {
    "web-development": "تطوير الويب", mobile: "موبايل", design: "تصميم",
    "data-science": "علم البيانات", marketing: "تسويق", photography: "تصوير", business: "أعمال", music: "موسيقى"
  };

  const firstLesson = course.sections[0]?.lessons[0];

  return (
    <div className="space-y-8">
      {/* Back */}
      <Link
        href="/courses"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowRight size={16} />
        العودة للكورسات
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-8 lg:col-span-2">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="badge-primary badge">{categoryLabel[course.category]}</span>
              <span className="badge-muted badge">{levelLabel[course.level]}</span>
              <span className="badge-muted badge">{course.language}</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{course.title}</h1>
            <p className="text-muted-foreground leading-relaxed">{course.description}</p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                <span className="font-bold text-foreground">{course.rating}</span>
                <span className="text-muted-foreground">({course.reviewsCount.toLocaleString("ar-EG")} تقييم)</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Users size={15} /> {course.studentsCount.toLocaleString("ar-EG")} طالب
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock size={15} /> {course.duration}
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <BookOpen size={15} /> {totalLessons} درس
              </div>
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                {course.instructor.name[0]}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">المدرّب</p>
                <p className="font-semibold text-foreground">{course.instructor.name}</p>
              </div>
            </div>
          </div>

          {/* Progress (if enrolled) */}
          {purchased && (
            <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">تقدّمك في الكورس</span>
                <span className="text-primary font-bold">{progressPercent}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                أكملت {completedCount} من {totalLessons} درس
              </p>
            </div>
          )}

          {/* What you'll learn */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-lg font-bold text-foreground">ماذا ستتعلم</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {course.whatYouLearn.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">محتوى الكورس</h2>
            {course.sections.map((section) => {
              const isOpen = openSections.has(section.id);
              return (
                <div key={section.id} className="overflow-hidden rounded-2xl border border-border bg-card">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="flex w-full items-center justify-between px-5 py-4 text-right"
                  >
                    <div>
                      <p className="font-semibold text-foreground">{section.title}</p>
                      <p className="text-xs text-muted-foreground">{section.lessons.length} درس</p>
                    </div>
                    {isOpen ? <ChevronUp size={18} className="text-muted-foreground" /> : <ChevronDown size={18} className="text-muted-foreground" />}
                  </button>
                  {isOpen && (
                    <div className="border-t border-border divide-y divide-border">
                      {section.lessons.map((lesson) => {
                        const isCompleted = progress?.completedLessons.includes(lesson.id);
                        const isAccessible = purchased || lesson.isFree;
                        return (
                          <div key={lesson.id} className="flex items-center justify-between px-5 py-3">
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "flex size-7 items-center justify-center rounded-full",
                                isCompleted ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                              )}>
                                {lesson.kind === "exam" ? <Award size={14} /> :
                                  lesson.kind === "pdf" ? <FileText size={14} /> :
                                    <Play size={14} />}
                              </div>
                              <div>
                                <p className={cn("text-sm", isCompleted ? "text-primary font-medium" : "text-foreground")}>
                                  {lesson.title}
                                </p>
                                {lesson.isFree && (
                                  <span className="text-[10px] text-primary font-semibold">مجاني</span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {lesson.duration && (
                                <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                              )}
                              {isAccessible ? (
                                <Link
                                  href={`/courses/${course.id}/lessons/${lesson.id}`}
                                  className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary hover:text-white transition-all"
                                >
                                  {isCompleted ? "إعادة" : "ابدأ"}
                                </Link>
                              ) : (
                                <Lock size={14} className="text-muted-foreground" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Requirements */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <h2 className="text-lg font-bold text-foreground">المتطلبات</h2>
            <ul className="space-y-2">
              {course.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar / CTA */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 space-y-5 shadow-sm">
            {/* Preview placeholder */}
            <div className="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-primary/60">
                <Play size={40} />
                <p className="text-sm font-medium">معاينة الكورس</p>
              </div>
            </div>

            {/* Price */}
            {!purchased && (
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">
                    {course.isFree ? "مجاني" : formatPrice(course.price)}
                  </span>
                  {course.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(course.originalPrice)}
                    </span>
                  )}
                </div>
                {course.originalPrice && (
                  <span className="badge-danger badge text-xs">
                    خصم {Math.round((1 - course.price / course.originalPrice) * 100)}%
                  </span>
                )}
              </div>
            )}

            {/* CTA */}
            {purchased ? (
              <Link
                href={firstLesson ? `/courses/${course.id}/lessons/${firstLesson.id}` : "#"}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-white transition hover:bg-primary/90"
              >
                <Play size={18} />
                {progressPercent > 0 ? "متابعة التعلّم" : "ابدأ الكورس"}
              </Link>
            ) : (
              <PaymobButton course={course} />
            )}

            {/* Info */}
            <div className="space-y-2.5 border-t border-border pt-4 text-sm">
              {[
                { icon: Clock, label: "مدة الكورس", value: course.duration },
                { icon: BookOpen, label: "عدد الدروس", value: `${totalLessons} درس` },
                { icon: Users, label: "الطلاب", value: course.studentsCount.toLocaleString("ar-EG") },
                { icon: Globe, label: "اللغة", value: course.language },
                { icon: Award, label: "المستوى", value: levelLabel[course.level] },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon size={14} /> {label}
                  </div>
                  <span className="font-medium text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
