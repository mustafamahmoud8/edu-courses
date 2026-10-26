"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { CourseCard } from "@/components/courses/CourseCard";
import { COURSES } from "@/data/courses";
import { CourseCategory, CourseLevel } from "@/types/course";
import { cn } from "@/lib/utils";

const CATEGORIES: { value: CourseCategory | "all"; label: string }[] = [
  { value: "all", label: "الكل" },
  { value: "web-development", label: "تطوير الويب" },
  { value: "mobile", label: "تطبيقات موبايل" },
  { value: "design", label: "تصميم" },
  { value: "data-science", label: "علم البيانات" },
  { value: "marketing", label: "تسويق" },
  { value: "photography", label: "تصوير" },
];

const LEVELS: { value: CourseLevel | "all"; label: string }[] = [
  { value: "all", label: "الكل" },
  { value: "beginner", label: "مبتدئ" },
  { value: "intermediate", label: "متوسط" },
  { value: "advanced", label: "متقدم" },
];

const SORT_OPTIONS = [
  { value: "rating", label: "الأعلى تقييماً" },
  { value: "students", label: "الأكثر طلاباً" },
  { value: "price-asc", label: "السعر: الأقل" },
  { value: "price-desc", label: "السعر: الأعلى" },
];

export default function CoursesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CourseCategory | "all">("all");
  const [level, setLevel] = useState<CourseLevel | "all">("all");
  const [sort, setSort] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...COURSES];
    if (query)
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.description.includes(query) ||
          c.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      );
    if (category !== "all") result = result.filter((c) => c.category === category);
    if (level !== "all") result = result.filter((c) => c.level === level);
    result.sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "students") return b.studentsCount - a.studentsCount;
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return 0;
    });
    return result;
  }, [query, category, level, sort]);

  const hasActiveFilters = category !== "all" || level !== "all" || query;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">استكشف الكورسات</h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} كورس متاح
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-72">
            <Search
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن كورس..."
              className="w-full rounded-xl border border-border bg-secondary py-2.5 pr-9 pl-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition",
              showFilters
                ? "border-primary bg-primary text-white"
                : "border-border bg-secondary text-foreground hover:border-primary hover:text-primary"
            )}
          >
            <SlidersHorizontal size={16} />
            <span className="hidden sm:inline">فلترة</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">التخصص</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setCategory(c.value as CourseCategory | "all")}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-xs font-medium transition",
                      category === c.value
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Level */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">المستوى</label>
              <div className="flex flex-wrap gap-2">
                {LEVELS.map((l) => (
                  <button
                    key={l.value}
                    onClick={() => setLevel(l.value as CourseLevel | "all")}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-xs font-medium transition",
                      level === l.value
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">ترتيب حسب</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear */}
          {hasActiveFilters && (
            <button
              onClick={() => { setQuery(""); setCategory("all"); setLevel("all"); }}
              className="flex items-center gap-1.5 text-xs text-destructive hover:underline"
            >
              <X size={13} /> مسح الفلاتر
            </button>
          )}
        </div>
      )}

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value as CourseCategory | "all")}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition",
              category === c.value
                ? "border-primary bg-primary text-white"
                : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-4 text-5xl">🔍</div>
          <p className="text-lg font-semibold text-foreground">لا توجد نتائج</p>
          <p className="text-sm text-muted-foreground">جرّب كلمات بحث مختلفة</p>
        </div>
      ) : (
        <div className="courses-grid">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
