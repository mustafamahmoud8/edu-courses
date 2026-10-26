import { Check } from "lucide-react";
import { examQuestions } from "@/data/dummy-data";

interface ExamCompleteProps {
  remainingSeconds: number;
  answers: Record<number, number>;
  level: number;
  onRetry: () => void;
}

export function ExamComplete({
  remainingSeconds,
  answers,
  level,
  onRetry,
}: ExamCompleteProps) {
  const answeredCount = Object.keys(answers).length;
  const isTimeUp = remainingSeconds === 0;

  return (
    <article className="min-h-[min(400px,calc(100dvh-300px))] rounded-[20px] bg-card p-[20px_15px] text-card-foreground flex flex-col items-start justify-center gap-4">
      <Check className="text-primary" size={24} aria-hidden="true" />

      <h2
        id="modal-title"
        className="m-0 text-[22px] font-semibold text-(--exam-copy)"
      >
        Quiz complete
      </h2>

      <p className="leading-[1.6] text-muted-foreground">
        {isTimeUp ? "Time is up. " : ""}You answered {answeredCount} of{" "}
        {examQuestions.length} questions. Your session level is {level}%.
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="min-h-10 rounded-md border-0 bg-(--exam-answer) px-4 text-[13px] font-semibold text-white cursor-pointer transition-colors hover:bg-(--exam-blue)"
      >
        Try again
      </button>
    </article>
  );
}
