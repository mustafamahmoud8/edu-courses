"use client";

import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

interface QuestionModalProps {
  onClose?: () => void;
}

export function QuestionModal({ onClose }: QuestionModalProps) {
  const [question, setQuestion] = useState("");

  useEffect(() => {
    const savedDraft = sessionStorage.getItem("itlegend-question-draft");
    if (savedDraft) {
      setQuestion(savedDraft);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("itlegend-question-draft", question);
  }, [question]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2
        id="modal-title"
        className="mb-2 text-2xl font-semibold text-foreground"
      >
        Ask a Question
      </h2>

      <p className="mb-4 text-muted-foreground text-[14px] leading-[1.7]">
        Write your question below. If you close this window, your draft will be
        here when you reopen it.
      </p>
      <label htmlFor="question-draft" className="sr-only">
        Your question
      </label>
      <textarea
        id="question-draft"
        className="block min-h-47 w-full resize-y rounded-md border border-input bg-background p-3 text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-ring"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Write your question..."
      />
      <Button type="submit" className="min-h-12 mt-5 font-medium">
        Submit Question <ArrowRight className="size-4" />
      </Button>
    </form>
  );
}
