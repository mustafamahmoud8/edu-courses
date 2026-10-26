import { AlarmClock, ChevronLeft } from "lucide-react";

interface ExamHeaderProps {
  currentQuestion: number;
  remainingSeconds: number;
  onClose: () => void;
  onPrev: () => void;
}

export function ExamHeader({
  currentQuestion,
  remainingSeconds,
  onClose,
  onPrev,
}: ExamHeaderProps) {
  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
  const seconds = String(remainingSeconds % 60).padStart(2, "0");

  const handleBackOrClose = () => {
    if (currentQuestion === 0) {
      onClose();
    } else {
      onPrev();
    }
  };

  return (
    <header className="flex h-10 items-center justify-between text-white">
      <button
        type="button"
        aria-label={currentQuestion === 0 ? "Close exam" : "Previous question"}
        onClick={handleBackOrClose}
        className="grid h-9 w-9 place-items-center rounded-full border-0 bg-transparent text-white cursor-pointer transition-opacity hover:opacity-80"
      >
        <ChevronLeft size={25} strokeWidth={1.8} aria-hidden="true" />
      </button>

      <strong
        className="inline-flex items-center gap-2 rounded-[7px] bg-(--exam-timer) px-4 py-2 text-[14px] text-(--exam-timer-foreground) shadow-[0_4px_14px_rgba(255,212,0,0.25)]"
        aria-label={`Time remaining ${minutes} minutes ${seconds} seconds`}
      >
        <AlarmClock size={16} aria-hidden="true" />
        {minutes}:{seconds}
      </strong>

      <span className="w-8" aria-hidden="true" />
    </header>
  );
}
