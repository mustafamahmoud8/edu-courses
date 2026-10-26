"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Clock, Users, BookOpen, Lock } from "lucide-react";
import { Course } from "@/types/course";
import { formatPrice, cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

type CourseCardProps = {
  course: Course;
  showProgress?: boolean;
  progress?: number;
};

export function CourseCard({ course, showProgress, progress }: CourseCardProps) {
  const { hasPurchased } = useAuth();
  const purchased = hasPurchased(course.id);

  const levelLabel: Record<string, string> = {
    beginner: "مبتدئ",
    intermediate: "متوسط",
    advanced: "متقدم",
  };
  const levelColor: Record<string, string> = {
    beginner: "badge-success",
    intermediate: "badge-warning",
    advanced: "badge-danger",
  };

  return (
    <Link
      href={`/courses/${course.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
          <BookOpen size={48} className="text-primary/40" />
        </div>
        {course.featured && (
          <div className="absolute top-3 right-3">
            <span className="badge-primary badge text-[11px]">⭐ مميز</span>
          </div>
        )}
        {purchased && (
          <div className="absolute top-3 left-3">
            <span className="badge badge-success text-[11px]">✓ مشترك</span>
          </div>
        )}
        {!purchased && !course.isFree && (
          <div className="absolute inset-0 flex items-end justify-end p-3">
            <div className="flex items-center gap-1 rounded-lg bg-black/60 px-2.5 py-1 text-xs text-white">
              <Lock size={11} />
              مدفوع
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className={cn("badge text-[11px]", levelColor[course.level])}>
            {levelLabel[course.level]}
          </span>
          <span className="badge-muted badge text-[11px]">{course.language}</span>
        </div>

        {/* Title */}
        <h3 className="line-clamp-2 font-semibold text-foreground transition group-hover:text-primary">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-xs text-muted-foreground">
          {course.instructor.name}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 text-sm">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          <span className="font-semibold text-foreground">{course.rating}</span>
          <span className="text-muted-foreground">
            ({course.reviewsCount.toLocaleString("ar-EG")})
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen size={12} /> {course.lessonsCount} درس
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} /> {course.studentsCount.toLocaleString("ar-EG")}
          </span>
        </div>

        {/* Progress */}
        {showProgress && progress !== undefined && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">التقدم</span>
              <span className="font-semibold text-primary">{progress}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Price */}
        <div className="mt-auto flex items-center justify-between pt-2 border-t border-border">
          {course.isFree ? (
            <span className="font-bold text-primary">مجاني</span>
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-foreground">
                {formatPrice(course.price)}
              </span>
              {course.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(course.originalPrice)}
                </span>
              )}
            </div>
          )}
          <span className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary group-hover:bg-primary group-hover:text-white transition-all">
            {purchased ? "متابعة" : "عرض"}
          </span>
        </div>
      </div>
    </Link>
  );
}
