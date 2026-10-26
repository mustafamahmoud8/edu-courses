"use client";

import { useState } from "react";
import { CALENDAR_EVENTS } from "@/data/courses";
import { CalendarEvent } from "@/types/assignment";
import {
  ChevronLeft, ChevronRight, CalendarDays,
  ClipboardList, BookOpen, Award, Radio
} from "lucide-react";
import { cn } from "@/lib/utils";

const DAYS = ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"];
const MONTHS = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
];

const EVENT_TYPE_CONFIG: Record<
  CalendarEvent["type"],
  { label: string; icon: typeof CalendarDays }
> = {
  assignment: { label: "واجب", icon: ClipboardList },
  lesson: { label: "درس", icon: BookOpen },
  exam: { label: "اختبار", icon: Award },
  live: { label: "مباشر", icon: Radio },
};

export default function CalendarPage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selected, setSelected] = useState<string | null>(null);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const getEventsForDate = (day: number): CalendarEvent[] => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return CALENDAR_EVENTS.filter((e) => e.date === dateStr);
  };

  const selectedEvents = selected
    ? CALENDAR_EVENTS.filter((e) => e.date === selected)
    : [];

  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">التقويم</h1>
        <div className="flex items-center gap-3">
          <button onClick={prevMonth} className="flex size-9 items-center justify-center rounded-xl border border-border hover:bg-secondary transition">
            <ChevronRight size={18} />
          </button>
          <span className="min-w-[120px] text-center font-semibold text-foreground">
            {MONTHS[month]} {year}
          </span>
          <button onClick={nextMonth} className="flex size-9 items-center justify-center rounded-xl border border-border hover:bg-secondary transition">
            <ChevronLeft size={18} />
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar grid */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card overflow-hidden">
          {/* Days header */}
          <div className="grid grid-cols-7 border-b border-border">
            {DAYS.map((d) => (
              <div key={d} className="py-3 text-center text-xs font-semibold text-muted-foreground">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar cells */}
          <div className="grid grid-cols-7">
            {/* Empty cells before first day */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="min-h-[80px] border-b border-l border-border p-1" />
            ))}

            {/* Day cells */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const events = getEventsForDate(day);
              const isToday = dateStr === todayStr;
              const isSelected = dateStr === selected;

              return (
                <div
                  key={day}
                  onClick={() => setSelected(isSelected ? null : dateStr)}
                  className={cn(
                    "min-h-[80px] cursor-pointer border-b border-l border-border p-1.5 transition-colors",
                    isSelected ? "bg-primary/5" : "hover:bg-secondary/50"
                  )}
                >
                  <div className={cn(
                    "mb-1 flex size-7 items-center justify-center rounded-full text-sm font-medium",
                    isToday ? "bg-primary text-white" : "text-foreground"
                  )}>
                    {day}
                  </div>
                  <div className="space-y-0.5">
                    {events.slice(0, 2).map((ev) => (
                      <div
                        key={ev.id}
                        className="truncate rounded px-1 py-0.5 text-[10px] font-medium text-white"
                        style={{ backgroundColor: ev.color }}
                      >
                        {ev.title}
                      </div>
                    ))}
                    {events.length > 2 && (
                      <div className="text-[10px] text-muted-foreground">+{events.length - 2}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Event list */}
        <div className="space-y-4">
          {/* Legend */}
          <div className="rounded-2xl border border-border bg-card p-4 space-y-2">
            <p className="text-sm font-semibold text-foreground">أنواع الأحداث</p>
            {Object.entries(EVENT_TYPE_CONFIG).map(([type, { label, icon: Icon }]) => {
              const color = CALENDAR_EVENTS.find((e) => e.type === type)?.color ?? "#888";
              return (
                <div key={type} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="size-3 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  <Icon size={13} />
                  {label}
                </div>
              );
            })}
          </div>

          {/* Selected day events */}
          {selected && (
            <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
              <p className="text-sm font-semibold text-foreground">
                أحداث {selected}
              </p>
              {selectedEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground">لا توجد أحداث هذا اليوم</p>
              ) : (
                <div className="space-y-2">
                  {selectedEvents.map((ev) => {
                    const { label, icon: Icon } = EVENT_TYPE_CONFIG[ev.type];
                    return (
                      <div
                        key={ev.id}
                        className="flex items-center gap-3 rounded-xl p-3"
                        style={{ backgroundColor: ev.color + "15", borderRight: `3px solid ${ev.color}` }}
                      >
                        <Icon size={16} style={{ color: ev.color }} />
                        <div>
                          <p className="text-sm font-medium text-foreground">{ev.title}</p>
                          <p className="text-xs text-muted-foreground">{label}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Upcoming events */}
          <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
            <p className="text-sm font-semibold text-foreground">أحداث قادمة</p>
            {CALENDAR_EVENTS.slice(0, 4).map((ev) => {
              const { label, icon: Icon } = EVENT_TYPE_CONFIG[ev.type];
              return (
                <div key={ev.id} className="flex items-center gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: ev.color + "20" }}>
                    <Icon size={14} style={{ color: ev.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{ev.title}</p>
                    <p className="text-xs text-muted-foreground">{ev.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
