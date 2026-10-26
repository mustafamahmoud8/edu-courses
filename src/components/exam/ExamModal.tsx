"use client";

import { useExam } from "./useExam";
import { ExamHeader } from "./ExamHeader";
import { ExamNav } from "./ExamNav";
import { ExamComplete } from "./ExamComplete";
import { ExamCarousel } from "./ExamCarousel";

interface ExamModalProps {
  onProgressAction: (level: number) => void;
  onCloseAction: () => void;
}

export function ExamModal({ onProgressAction, onCloseAction }: ExamModalProps) {
  const {
    answers,
    currentQuestion,
    remainingSeconds,
    completed,
    notice,
    level,
    selectAnswer,
    goToQuestion,
    resetExam,
  } = useExam(onProgressAction);

  return (
    <div className="p-5 sm:p-0">
      <ExamHeader
        currentQuestion={currentQuestion}
        remainingSeconds={remainingSeconds}
        onClose={onCloseAction}
        onPrev={() => goToQuestion(currentQuestion - 1)}
      />

      <ExamNav
        currentQuestion={currentQuestion}
        answers={answers}
        onSelect={goToQuestion}
      />

      {completed ? (
        <ExamComplete
          remainingSeconds={remainingSeconds}
          answers={answers}
          level={level}
          onRetry={resetExam}
        />
      ) : (
        <ExamCarousel
          currentQuestion={currentQuestion}
          answers={answers}
          notice={notice}
          onSelectOption={selectAnswer}
          onSlideChange={goToQuestion}
        />
      )}
    </div>
  );
}
