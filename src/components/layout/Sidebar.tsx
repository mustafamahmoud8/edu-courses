"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Calendar,
  User,
  LogOut,
  GraduationCap,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getInitials } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/courses", label: "الكورسات", icon: BookOpen },
  { href: "/assignments", label: "الواجبات", icon: ClipboardList },
  { href: "/calendar", label: "التقويم", icon: Calendar },
  { href: "/profile", label: "ملفي الشخصي", icon: User },
];

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "app-sidebar flex flex-col",
          isOpen && "open"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5"
            onClick={onClose}
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
              <GraduationCap size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">EduCourses</span>
          </Link>
          <button
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* User */}
        {user && (
          <div className="border-b border-border px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                {getInitials(user.name)}
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold text-foreground">{user.name}</p>
                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 space-y-1 p-3">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-border p-3">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut size={18} />
            تسجيل الخروج
          </button>
        </div>
      </aside>
    </>
  );
}
