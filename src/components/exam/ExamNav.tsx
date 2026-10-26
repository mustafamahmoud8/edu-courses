import { examQuestions } from "@/data/dummy-data";

interface ExamNavProps {
  currentQuestion: number;
  answers: Record<number, number>;
  onSelect: (index: number) => void;
}

export function ExamNav({ currentQuestion, answers, onSelect }: ExamNavProps) {
  return (
    <nav
      className="mt-6 mb-11 flex justify-center gap-3 flex-wrap"
      aria-label="Exam question number"
    >
      {examQuestions.map((_, index) => {
        const isCurrent = currentQuestion === index;
        const isAnswered = answers[index] !== undefined;

        const btnStyle = isCurrent
          ? "bg-white text-[var(--exam-blue)]"
          : isAnswered
            ? "bg-white/15 text-white"
            : "bg-transparent text-white";

        return (
          <button
            type="button"
            key={index}
            onClick={() => onSelect(index)}
            aria-current={isCurrent ? "step" : undefined}
            aria-label={`Question ${index + 1}${isAnswered ? ", answered" : ""}`}
            className={`grid h-10 w-10 place-items-center rounded-full border border-white font-medium cursor-pointer transition-colors ${btnStyle}`}
          >
            {index + 1}
          </button>
        );
      })}
    </nav>
  );
}
