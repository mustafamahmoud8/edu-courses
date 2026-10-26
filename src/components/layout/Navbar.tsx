"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, Bell, GraduationCap } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "لوحة التحكم",
  "/courses": "الكورسات",
  "/assignments": "الواجبات",
  "/calendar": "التقويم",
  "/profile": "ملفي الشخصي",
};

export function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  const title =
    Object.entries(PAGE_TITLES).find(([key]) =>
      pathname === key || pathname.startsWith(key + "/")
    )?.[1] ?? "EduCourses";

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center gap-3 px-4 md:px-6">
        {/* Mobile menu */}
        <button
          onClick={onMenuClick}
          className="flex size-9 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
        >
          <Menu size={20} />
        </button>

        {/* Mobile logo */}
        <Link href="/dashboard" className="flex items-center gap-2 lg:hidden">
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary">
            <GraduationCap size={15} className="text-white" />
          </div>
          <span className="font-bold text-foreground">EduCourses</span>
        </Link>

        {/* Page title (desktop) */}
        <h1 className="hidden text-lg font-semibold text-foreground lg:block">
          {title}
        </h1>

        <div className="mr-auto flex items-center gap-2">
          {/* Search */}
          <div className={cn("flex items-center transition-all", searchOpen ? "w-64" : "w-9")}>
            {searchOpen ? (
              <div className="flex w-full items-center gap-2 rounded-xl border border-border bg-secondary px-3 py-2">
                <Search size={16} className="shrink-0 text-muted-foreground" />
                <input
                  autoFocus
                  placeholder="ابحث عن كورس..."
                  onBlur={() => setSearchOpen(false)}
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="flex size-9 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Search size={18} />
              </button>
            )}
          </div>

          {/* Notifications */}
          <button className="relative flex size-9 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary" />
          </button>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Avatar */}
          {user && (
            <Link
              href="/profile"
              className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white hover:opacity-90"
            >
              {getInitials(user.name)}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
