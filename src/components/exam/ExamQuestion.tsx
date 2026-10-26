interface ExamQuestionProps {
  currentQuestion: number;
  current: { prompt: string; options: string[] };
  selectedAnswer?: number;
  notice: string;
  onSelectOption: (index: number) => void;
}

export function ExamQuestion({
  currentQuestion,
  current,
  selectedAnswer,
  notice,
  onSelectOption,
}: ExamQuestionProps) {
  return (
    <article className="min-h-102 w-full rounded-[20px] bg-card p-5 text-card-foreground">
      <span className="text-[15px] font-bold">{currentQuestion + 1}.</span>
      <h2
        id="modal-title"
        className="m-[6px_0_24px] text-[15px] font-semibold leading-[1.7] text-(--exam-copy)"
      >
        {current.prompt}
      </h2>

      <div className="grid gap-6" role="radiogroup" aria-label="Answer choices">
        {current.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          return (
            <button
              type="button"
              key={option}
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectOption(index)}
              className={`flex min-h-11 items-center gap-3 rounded-[7px] border-0 px-0 text-[13px] shadow-[0_3px_15px_var(--exam-shadow)] text-left cursor-pointer transition-colors ${
                isSelected
                  ? "text-white! bg-(--exam-answer)!"
                  : "text-(--exam-option-copy) bg-white"
              }`}
            >
              <span
                className={`grid h-11 w-9 shrink-0 place-items-center border-r ${
                  isSelected ? "border-primary-foreground/40" : "border-border"
                }`}
              >
                <span
                  className={`grid h-4 w-4 place-items-center rounded-xs border ${
                    isSelected ? "border-white" : "border-(--exam-blue-light)"
                  }`}
                  aria-hidden="true"
                >
                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-white" />
                  )}
                </span>
              </span>
              {option}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {notice}
      </p>
    </article>
  );
}
