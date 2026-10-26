"use client";

import { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { examQuestions } from "@/data/dummy-data";
import { ExamQuestion } from "./ExamQuestion";

interface ExamCarouselProps {
  currentQuestion: number;
  answers: Record<number, number>;
  notice: string;
  onSelectOption: (index: number) => void;
  onSlideChange: (index: number) => void;
}

export function ExamCarousel({
  currentQuestion,
  answers,
  notice,
  onSelectOption,
  onSlideChange,
}: ExamCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    watchDrag: true,
  });

  useEffect(() => {
    if (!emblaApi) return;
    if (emblaApi.selectedScrollSnap() !== currentQuestion) {
      emblaApi.scrollTo(currentQuestion);
    }
  }, [emblaApi, currentQuestion]);

  const handleSelect = useCallback(() => {
    if (!emblaApi) return;
    const selectedIndex = emblaApi.selectedScrollSnap();
    if (selectedIndex !== currentQuestion) {
      onSlideChange(selectedIndex);
    }
  }, [emblaApi, currentQuestion, onSlideChange]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", handleSelect);
    return () => {
      emblaApi.off("select", handleSelect);
    };
  }, [emblaApi, handleSelect]);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-2">
        {examQuestions.map((q, index) => (
          <div key={index} className="w-full grow shrink-[0.02] basis-full">
            <ExamQuestion
              currentQuestion={index}
              current={q}
              selectedAnswer={answers[index]}
              notice={notice}
              onSelectOption={onSelectOption}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
