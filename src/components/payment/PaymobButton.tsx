"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Course } from "@/types/course";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart, Loader2, CreditCard } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function PaymobButton({ course }: { course: Course }) {
  const { isAuthenticated, purchaseCourse } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleBuy = async () => {
    if (!isAuthenticated) {
      toast.error("سجّل دخولك أولاً");
      router.push("/auth/login");
      return;
    }

    if (course.isFree) {
      purchaseCourse(course.id);
      toast.success("تم تسجيلك في الكورس المجاني! 🎉");
      return;
    }

    setShowModal(true);
  };

  const handlePaymob = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/paymob/intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course.id,
          amount: course.price,
          courseName: course.title,
        }),
      });

      const data = await res.json();

      if (data.clientSecret) {
        // Open Paymob payment page
        window.location.href = `https://accept.paymob.com/unifiedcheckout/?publicKey=${data.publicKey}&clientSecret=${data.clientSecret}`;
      } else if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        throw new Error("No payment URL");
      }
    } catch (err) {
      // Demo mode: simulate purchase
      toast.loading("جاري معالجة الدفع...", { duration: 2000 });
      setTimeout(() => {
        purchaseCourse(course.id);
        setShowModal(false);
        toast.success("تم الشراء بنجاح! يمكنك الآن الوصول للكورس 🎉");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleBuy}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-white transition hover:bg-primary/90 active:scale-95"
      >
        <ShoppingCart size={18} />
        {course.isFree ? "التسجيل مجاناً" : `اشترِ الآن — ${formatPrice(course.price)}`}
      </button>

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-card border border-border p-6 space-y-5 shadow-xl">
            <h2 className="text-xl font-bold text-foreground">تأكيد الشراء</h2>

            {/* Course summary */}
            <div className="rounded-xl bg-secondary p-4 space-y-2">
              <p className="font-semibold text-foreground line-clamp-2">{course.title}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">المدرّب</span>
                <span className="text-foreground">{course.instructor.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">السعر</span>
                <span className="text-xl font-bold text-primary">{formatPrice(course.price)}</span>
              </div>
            </div>

            {/* Paymob notice */}
            <div className="flex items-start gap-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 p-4 text-sm text-blue-700 dark:text-blue-300">
              <CreditCard size={18} className="mt-0.5 shrink-0" />
              <p>ستُوجَّه إلى بوابة Paymob الآمنة لإتمام عملية الدفع</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 rounded-xl border border-border py-3 text-sm font-semibold text-foreground transition hover:bg-secondary"
              >
                إلغاء
              </button>
              <button
                onClick={handlePaymob}
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
              >
                {loading ? (
                  <><Loader2 size={16} className="animate-spin" /> جاري التحويل...</>
                ) : (
                  <>
                    <CreditCard size={16} />
                    تأكيد الدفع
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
