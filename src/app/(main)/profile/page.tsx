"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/contexts/ProgressContext";
import { COURSES } from "@/data/courses";
import { calculateProgress, getInitials } from "@/lib/utils";
import { User, Mail, Phone, Camera, Save, BookOpen, TrendingUp, Award, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { user } = useAuth();
  const { getProgress } = useProgress();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: "+20 109 342 1310",
    bio: "طالب متحمّس لتعلم البرمجة والتصميم 🚀",
  });

  const enrolledCourses = COURSES.filter((c) =>
    user?.purchasedCourses.includes(c.id)
  );

  const totalProgress =
    enrolledCourses.length > 0
      ? Math.round(
          enrolledCourses.reduce((acc, course) => {
            const p = getProgress(course.id);
            const total = course.sections.reduce(
              (s, sec) => s + sec.lessons.length,
              0
            );
            return acc + calculateProgress(p?.completedLessons ?? [], total);
          }, 0) / enrolledCourses.length
        )
      : 0;

  const handleSave = () => {
    setEditing(false);
    toast.success("تم حفظ البيانات بنجاح ✅");
  };

  const stats = [
    { label: "الكورسات المسجّلة", value: enrolledCourses.length, icon: BookOpen, color: "text-primary bg-primary/10" },
    { label: "متوسط التقدم", value: `${totalProgress}%`, icon: TrendingUp, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30" },
    { label: "الشهادات", value: 0, icon: Award, color: "text-green-500 bg-green-50 dark:bg-green-950/30" },
    { label: "التقييمات", value: 0, icon: Star, color: "text-amber-500 bg-amber-50 dark:bg-amber-950/30" },
  ];

  return (
    <div className="space-y-8">
      {/* Header card */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
        {/* Cover */}
        <div className="h-32 bg-gradient-to-l from-primary/30 via-primary/20 to-primary/10" />

        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="relative -mt-12 mb-4 flex items-end justify-between">
            <div className="relative">
              <div className="flex size-24 items-center justify-center rounded-2xl border-4 border-card bg-primary text-3xl font-bold text-white shadow-md">
                {getInitials(user?.name ?? "U")}
              </div>
              <button className="absolute -bottom-1 -left-1 flex size-7 items-center justify-center rounded-full border-2 border-card bg-secondary text-muted-foreground hover:text-foreground transition">
                <Camera size={13} />
              </button>
            </div>

            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
              >
                تعديل الملف
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                <Save size={14} />
                حفظ
              </button>
            )}
          </div>

          {/* Info */}
          {editing ? (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { key: "name", label: "الاسم الكامل", icon: User },
                  { key: "email", label: "البريد الإلكتروني", icon: Mail },
                  { key: "phone", label: "رقم الهاتف", icon: Phone },
                ].map(({ key, label, icon: Icon }) => (
                  <div key={key} className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">{label}</label>
                    <div className="relative">
                      <Icon size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                        className="w-full rounded-xl border border-border bg-background py-2.5 pr-9 pl-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">نبذة عني</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                  rows={3}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">{form.name}</h2>
              <p className="text-sm text-muted-foreground">{form.bio}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-1">
                <span className="flex items-center gap-1.5"><Mail size={14} /> {form.email}</span>
                <span className="flex items-center gap-1.5"><Phone size={14} /> {form.phone}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-5 space-y-3">
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
      {enrolledCourses.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-foreground">الكورسات المسجّلة</h3>
          <div className="space-y-3">
            {enrolledCourses.map((course) => {
              const p = getProgress(course.id);
              const total = course.sections.reduce((s, sec) => s + sec.lessons.length, 0);
              const pct = calculateProgress(p?.completedLessons ?? [], total);
              return (
                <div key={course.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <BookOpen size={20} className="text-primary" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-2">
                    <p className="truncate font-medium text-foreground">{course.title}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-primary shrink-0">{pct}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Account settings */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <h3 className="text-lg font-bold text-foreground">إعدادات الحساب</h3>
        <div className="space-y-3">
          {[
            { label: "تغيير كلمة المرور", desc: "حدّث كلمة المرور لأمان أفضل" },
            { label: "إشعارات البريد الإلكتروني", desc: "اختر ما تريد استقباله" },
            { label: "حذف الحساب", desc: "هذا الإجراء لا يمكن التراجع عنه", danger: true },
          ].map(({ label, desc, danger }) => (
            <div key={label} className="flex items-center justify-between rounded-xl border border-border p-4">
              <div>
                <p className={cn("font-medium", danger ? "text-destructive" : "text-foreground")}>{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <button className={cn(
                "rounded-lg border px-3 py-1.5 text-sm font-medium transition",
                danger
                  ? "border-destructive/30 text-destructive hover:bg-destructive/10"
                  : "border-border text-foreground hover:border-primary hover:text-primary"
              )}>
                {danger ? "حذف" : "تعديل"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
