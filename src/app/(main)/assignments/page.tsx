"use client";

import { useState } from "react";
import { ASSIGNMENTS } from "@/data/courses";
import { Assignment, AssignmentStatus } from "@/types/assignment";
import { isDeadlinePassed } from "@/lib/utils";
import { ClipboardList, Clock, CheckCircle2, XCircle, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<
  AssignmentStatus,
  { label: string; class: string; icon: typeof Clock }
> = {
  pending: { label: "معلّق", class: "badge-warning", icon: Clock },
  submitted: { label: "مُسلَّم", class: "badge-primary", icon: CheckCircle2 },
  graded: { label: "مُقيَّم", class: "badge-success", icon: Star },
  late: { label: "متأخر", class: "badge-danger", icon: XCircle },
};

const FILTER_OPTIONS: { value: AssignmentStatus | "all"; label: string }[] = [
  { value: "all", label: "الكل" },
  { value: "pending", label: "معلّقة" },
  { value: "submitted", label: "مُسلَّمة" },
  { value: "graded", label: "مُقيَّمة" },
  { value: "late", label: "متأخرة" },
];

export default function AssignmentsPage() {
  const [filter, setFilter] = useState<AssignmentStatus | "all">("all");

  const filtered =
    filter === "all"
      ? ASSIGNMENTS
      : ASSIGNMENTS.filter((a) => a.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">الواجبات</h1>
        <p className="text-sm text-muted-foreground">{ASSIGNMENTS.length} واجب</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {FILTER_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition",
              filter === value
                ? "border-primary bg-primary text-white"
                : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
          <ClipboardList size={48} className="mb-4 text-muted-foreground/40" />
          <p className="font-semibold text-foreground">لا توجد واجبات</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((assignment) => {
            const config = STATUS_CONFIG[assignment.status];
            const StatusIcon = config.icon;
            const overdue =
              assignment.status === "pending" && isDeadlinePassed(assignment.dueDate);

            return (
              <div
                key={assignment.id}
                className="rounded-2xl border border-border bg-card p-5 space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <h3 className="font-semibold text-foreground">{assignment.title}</h3>
                    <p className="text-sm text-muted-foreground">{assignment.courseTitle}</p>
                  </div>
                  <span className={cn("badge shrink-0", config.class)}>
                    <StatusIcon size={12} />
                    {config.label}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {assignment.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 border-t border-border pt-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-muted-foreground" />
                    <span className={cn("font-medium", overdue ? "text-destructive" : "text-foreground")}>
                      {overdue ? "انتهى الموعد: " : "موعد التسليم: "}
                      {assignment.dueDate}
                    </span>
                  </div>

                  {assignment.grade !== undefined && (
                    <div className="flex items-center gap-1.5">
                      <Star size={14} className="text-amber-400" />
                      <span className="font-semibold text-foreground">
                        {assignment.grade}/{assignment.maxGrade}
                      </span>
                    </div>
                  )}

                  {assignment.submittedAt && (
                    <div className="text-muted-foreground">
                      تُسلِّم: {assignment.submittedAt}
                    </div>
                  )}
                </div>

                {/* Feedback */}
                {assignment.feedback && (
                  <div className="rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 p-4 text-sm text-green-700 dark:text-green-300">
                    <p className="font-semibold mb-1">تعليق المدرّب:</p>
                    <p>{assignment.feedback}</p>
                  </div>
                )}

                {/* Actions */}
                {assignment.status === "pending" && (
                  <button className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition">
                    تسليم الواجب
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
