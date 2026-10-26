"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Progress as ShadcnProgress } from "@/components/ui/progress";

export function CourseProgress({ value }: { value: number }) {
  const progressRef = useRef<HTMLDivElement>(null);
  const [reached, setReached] = useState(false);

  useEffect(() => {
    const element = progressRef.current;
    if (!element || reached) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReached(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [reached]);

  return (
    <section
      className="pb-0.5"
      aria-label={`Current student level: ${value} percent`}
    >
      <span className="sr-only">
        Your current student level is {value} percent.
      </span>
      <div className="relative mt-7.5">
        <span
          className="absolute -top-7.75 z-1 flex h-6 w-6 leading-6 items-center justify-center rounded-full border border-gray-300 bg-card text-[9px] text-(--exam-blue) font-bold shadow-sm"
          style={
            {
              left: `${Math.min(100, Math.max(0, value))}%`,
              transform: "translateX(-50%)",
            } as CSSProperties
          }
        >
          You
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-4 border-x-transparent border-t-[5px] border-t-gray-300"
          />
        </span>
        <ShadcnProgress
          value={reached ? value : 0}
          aria-label="Current student level"
          ref={progressRef}
          className="h-0.75 overflow-hidden rounded-full bg-muted"
        />
        <p
          className="absolute top-1.75 m-0 w-max text-[9px] font-bold text-(--exam-blue)"
          style={
            {
              left: `clamp(6px, ${value}%, calc(100% - 6px))`,
              transform: "translateX(-50%)",
            } as CSSProperties
          }
        >
          {value}%
        </p>
      </div>
    </section>
  );
}
