"use client";

import { useEffect, useState } from "react";
import { FileText, LockKeyhole } from "lucide-react";
import { CourseProgress } from "./course-progress";
import { courseWeeks } from "@/data/dummy-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatedText } from "../AnimatedText";
import Motion from "../Motion";

export function CourseOutline({
  onExam,
  onPdf,
  sessionLevel = 0,
}: {
  onExam?: (() => void) | undefined;
  onPdf?: (() => void) | undefined;
  sessionLevel?: number;
}) {
  const [openWeeks, setOpenWeeks] = useState<string[]>([courseWeeks[0].id]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 901px)");
    const setResponsiveDefaults = () =>
      setOpenWeeks(
        media.matches ? courseWeeks.map(({ id }) => id) : [courseWeeks[0].id],
      );
    setResponsiveDefaults();
    media.addEventListener("change", setResponsiveDefaults);
    return () => media.removeEventListener("change", setResponsiveDefaults);
  }, []);

  return (
    <aside
      id="curriculum"
      className="[grid-area:curriculum] xl:w-106 scroll-mt-6"
      aria-labelledby="topics-heading"
    >
      <AnimatedText
        as="h2"
        id="topics-heading"
        text="Topics for This Course"
        className="main-heading max-[900px]:mt-11 lg:mt-0 mb-4"
      />

      <CourseProgress value={sessionLevel} />

      <Accordion
        type="multiple"
        value={openWeeks}
        onValueChange={setOpenWeeks}
        className="mt-12 grid gap-10"
      >
        {courseWeeks.map((week, idx) => (
          <Motion key={week.id} index={idx}>
            <AccordionItem
              value={week.id}
              className="rounded-xs border border-border bg-card px-4 py-3.5"
            >
              <AccordionTrigger className="py-1 text-left text-base font-semibold text-card-foreground hover:no-underline [&>svg]:size-4.5">
                {week.title}
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <p className="mb-2 text-[13px] leading-relaxed text-muted-foreground/80 max-w-100">
                  {week.description}
                </p>
                <div>
                  {week.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex min-h-12 items-center justify-between gap-3 border-t border-border text-[13px] text-foreground"
                    >
                      <div className="flex items-center gap-2.5 h-full">
                        <FileText
                          className="size-4.5 shrink-0 text-muted-foreground/80"
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />

                        <p>
                          {lesson.kind ? (
                            <button
                              type="button"
                              className="cursor-pointer text-left leading-snug text-muted-foreground hover:text-primary"
                              onClick={lesson.kind === "exam" ? onExam : onPdf}
                            >
                              {lesson.name}
                            </button>
                          ) : (
                            <span className="leading-snug text-muted-foreground">
                              {lesson.name}
                            </span>
                          )}
                        </p>
                      </div>
                      {lesson.questions ? (
                        <span className="flex shrink-0 flex-col items-end gap-0.5 font-normal tracking-wide text-[10px] leading-none">
                          <span className="rounded-[3px] bg-primary/10 px-1.5 py-1 font-semibold text-primary">
                            {lesson.questions}
                          </span>
                          <span className="rounded-[3px] bg-destructive/10 px-1.5 py-1 font-semibold text-destructive">
                            {lesson.duration}
                          </span>
                        </span>
                      ) : lesson.locked ? (
                        <LockKeyhole
                          className="size-3.5 shrink-0 text-foreground"
                          strokeWidth={1.7}
                          aria-label="Locked lesson"
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Motion>
        ))}
      </Accordion>
    </aside>
  );
}
