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

const schema = z
  .object({
    name: z.string().min(3, "الاسم على الأقل 3 أحرف"),
    email: z.string().email("بريد إلكتروني غير صحيح"),
    password: z.string().min(6, "كلمة المرور على الأقل 6 أحرف"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "كلمتا المرور غير متطابقتان",
    path: ["confirm"],
  });

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const { register: authRegister } = useAuth();
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const ok = await authRegister(data.name, data.email, data.password);
    if (ok) {
      toast.success("تم إنشاء الحساب بنجاح! 🎉");
      router.push("/dashboard");
    } else {
      toast.error("حدث خطأ، حاول مرة أخرى");
    }
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-4 py-12">
      <div className="fixed top-4 left-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary shadow-md">
            <GraduationCap size={28} className="text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">إنشاء حساب</h1>
            <p className="text-sm text-muted-foreground">انضم لآلاف الطلاب</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {[
            { id: "name", label: "الاسم الكامل", type: "text", placeholder: "مصطفى محمود" },
            { id: "email", label: "البريد الإلكتروني", type: "email", placeholder: "example@email.com" },
          ].map(({ id, label, type, placeholder }) => (
            <div key={id} className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">{label}</label>
              <input
                {...register(id as "name" | "email")}
                type={type}
                placeholder={placeholder}
                className={cn(
                  "w-full rounded-xl border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition",
                  "placeholder:text-muted-foreground",
                  "focus:border-primary focus:ring-2 focus:ring-primary/20",
                  errors[id as keyof typeof errors] ? "border-destructive" : "border-border"
                )}
              />
              {errors[id as keyof typeof errors] && (
                <p className="text-xs text-destructive">
                  {errors[id as keyof typeof errors]?.message}
                </p>
              )}
            </div>
          ))}

          {["password", "confirm"].map((id) => (
            <div key={id} className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                {id === "password" ? "كلمة المرور" : "تأكيد كلمة المرور"}
              </label>
              <div className="relative">
                <input
                  {...register(id as "password" | "confirm")}
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  className={cn(
                    "w-full rounded-xl border bg-background px-4 py-2.5 pl-10 text-sm text-foreground outline-none transition",
                    "placeholder:text-muted-foreground",
                    "focus:border-primary focus:ring-2 focus:ring-primary/20",
                    errors[id as keyof typeof errors] ? "border-destructive" : "border-border"
                  )}
                />
                {id === "password" && (
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                )}
              </div>
              {errors[id as keyof typeof errors] && (
                <p className="text-xs text-destructive">
                  {errors[id as keyof typeof errors]?.message}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
          >
            {isSubmitting ? (
              <><Loader2 size={18} className="animate-spin" /> جاري الإنشاء...</>
            ) : (
              "إنشاء الحساب"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          لديك حساب؟{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-primary hover:underline"
          >
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}
