"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="size-9" />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "group relative flex size-9 items-center justify-center rounded-xl",
        "bg-secondary hover:bg-muted transition-all duration-200",
        "text-muted-foreground hover:text-foreground",
        className
      )}
      aria-label={isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الغامق"}
    >
      <Sun
        size={18}
        className={cn(
          "absolute transition-all duration-300",
          isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        )}
      />
      <Moon
        size={18}
        className={cn(
          "absolute transition-all duration-300",
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        )}
      />
    </button>
  );
}
