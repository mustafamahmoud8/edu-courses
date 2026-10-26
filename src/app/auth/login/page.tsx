"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GraduationCap, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().email("بريد إلكتروني غير صحيح"),
  password: z.string().min(6, "كلمة المرور على الأقل 6 أحرف"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const ok = await login(data.email, data.password);
    if (ok) {
      toast.success("أهلاً بك مجدداً! 👋");
      router.push("/dashboard");
    } else {
      toast.error("بيانات غير صحيحة");
    }
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-4 py-12">
      {/* Theme toggle top-left */}
      <div className="fixed top-4 left-4">
        <ThemeToggle />
      </div>

      {/* Card */}
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8 shadow-sm">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary shadow-md">
            <GraduationCap size={28} className="text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">EduCourses</h1>
            <p className="text-sm text-muted-foreground">سجّل دخولك للمتابعة</p>
          </div>
        </div>

        {/* Demo hint */}
        <div className="rounded-xl bg-primary/10 px-4 py-3 text-sm text-primary">
          <p className="font-semibold">حساب تجريبي:</p>
          <p>mustafa@example.com / 123456</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              البريد الإلكتروني
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="example@email.com"
              className={cn(
                "w-full rounded-xl border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition",
                "placeholder:text-muted-foreground",
                "focus:border-primary focus:ring-2 focus:ring-primary/20",
                errors.email ? "border-destructive" : "border-border"
              )}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                className={cn(
                  "w-full rounded-xl border bg-background px-4 py-2.5 pl-10 text-sm text-foreground outline-none transition",
                  "placeholder:text-muted-foreground",
                  "focus:border-primary focus:ring-2 focus:ring-primary/20",
                  errors.password ? "border-destructive" : "border-border"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
          >
            {isSubmitting ? (
              <><Loader2 size={18} className="animate-spin" /> جاري الدخول...</>
            ) : (
              "تسجيل الدخول"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          ليس لديك حساب؟{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-primary hover:underline"
          >
            إنشاء حساب جديد
          </Link>
        </p>
      </div>
    </div>
  );
}
