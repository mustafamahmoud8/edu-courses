"use client";

import type { LucideIcon } from "lucide-react";
import { BookOpen, CircleHelp, MessageCircle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

type ModalKind = "question" | "leaderboard" | "exam" | "pdf" | null;

const QUICK_ACTIONS: {
  icon: LucideIcon;
  label: string;
  kind: "curriculum" | "comments" | "question" | "leaderboard";
}[] = [
  { icon: BookOpen, label: "Curriculum", kind: "curriculum" },
  { icon: MessageCircle, label: "Comments", kind: "comments" },
  { icon: CircleHelp, label: "Ask a question", kind: "question" },
  { icon: Trophy, label: "Leaderboard", kind: "leaderboard" },
];

interface CourseActionsProps {
  onOpenModal: (modal: ModalKind) => void;
}

export function CourseActions({ onOpenModal }: CourseActionsProps) {
  const handleAction = (kind: string) => {
    if (kind === "curriculum" || kind === "comments") {
      document
        .getElementById(kind)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      onOpenModal(kind as "question" | "leaderboard");
    }
  };

  return (
    <nav
      className="mx-0.5 mt-4 mb-3 flex gap-3 [grid-area:actions] md:mt-6 md:mb-4"
      aria-label="Course sections"
    >
      {QUICK_ACTIONS.map(({ icon: Icon, label, kind }) => (
        <Button
          key={kind}
          variant="outline"
          size="icon"
          onClick={() => handleAction(kind)}
          aria-label={label}
          className="size-9 rounded-full text-gray-600"
        >
          <Icon className="size-4" strokeWidth={1.8} aria-hidden="true" />
        </Button>
      ))}
    </nav>
  );
}
