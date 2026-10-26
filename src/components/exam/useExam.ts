"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { examQuestions } from "@/data/dummy-data";

const KEY = "itlegend-exam-";
const DURATION = 9 * 60 + 32;

export function useExam(onProgress: (lvl: number) => void) {
  const [answers, setAnswers] = useState<Record<number, number>>(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(sessionStorage.getItem(KEY + "answers") || "{}");
    } catch {
      return {};
    }
  });

  const [currentQuestion, setCurrentQuestion] = useState(() => {
    if (typeof window === "undefined") return 0;
    return Number(sessionStorage.getItem(KEY + "question")) || 0;
  });

  const [completed, setCompleted] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(KEY + "complete") === "true";
  });

  const [remainingSeconds, setRemainingSeconds] = useState(() => {
    if (typeof window === "undefined") return DURATION;

    let endTime = Number(sessionStorage.getItem(KEY + "end"));
    const isCompleted = sessionStorage.getItem(KEY + "complete") === "true";

    if (isCompleted) return 0;

    if (!endTime) {
      endTime = Date.now() + DURATION * 1000;
      sessionStorage.setItem(KEY + "end", String(endTime));
    }

    return Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
  });

  const [notice, setNotice] = useState("");

  const level = useMemo(() => {
    const correct = Object.entries(answers).filter(
      ([q, a]) => examQuestions[Number(q)]?.answer === Number(a),
    ).length;
    return Math.round((correct / examQuestions.length) * 100);
  }, [answers]);

  useEffect(() => {
    sessionStorage.setItem(KEY + "answers", JSON.stringify(answers));
    sessionStorage.setItem(KEY + "question", String(currentQuestion));
    sessionStorage.setItem(KEY + "complete", String(completed));
    sessionStorage.setItem(KEY + "level", String(level));
    onProgress(level);
  }, [answers, currentQuestion, completed, level, onProgress]);

  useEffect(() => {
    if (completed) return;

    let endTime = Number(sessionStorage.getItem(KEY + "end"));
    if (!endTime) {
      endTime = Date.now() + DURATION * 1000;
      sessionStorage.setItem(KEY + "end", String(endTime));
    }

    const timer = setInterval(() => {
      const rem = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
      setRemainingSeconds(rem);
      if (rem === 0) {
        setCompleted(true);
        setNotice("Finish Timer!");
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [completed]);

  const selectAnswer = useCallback(
    (optionIndex: number) => {
      if (completed || remainingSeconds === 0) return;
      if (answers[currentQuestion] !== undefined) return;
      setAnswers((prev) => ({ ...prev, [currentQuestion]: optionIndex }));
    },
    [currentQuestion, completed, remainingSeconds, answers],
  );

  useEffect(() => {
    if (!completed && Object.keys(answers).length === examQuestions.length) {
      setCompleted(true);
    }
  }, [answers, completed]);

  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < examQuestions.length) setCurrentQuestion(index);
  }, []);

  const resetExam = useCallback(() => {
    setCompleted(false);
    setCurrentQuestion(0);
    setAnswers({});
    sessionStorage.clear();
    setRemainingSeconds(DURATION);
    onProgress(0);
  }, [onProgress]);

  return {
    answers,
    currentQuestion,
    remainingSeconds,
    completed,
    notice,
    current: examQuestions[currentQuestion],
    level,
    selectAnswer,
    goToQuestion,
    resetExam,
  };
}
