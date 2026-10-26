"use client";

import { useState, useEffect } from "react";
import { CourseVideo } from "@/components/course-video";
import { CourseOutline } from "./course-outline";
import { CourseMaterials } from "./course-materials";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ExamModal } from "../exam/ExamModal";
import { QuestionModal } from "./question-modal";
import { LeaderboardModal } from "./leaderboard-modal";
import { PdfModal } from "./pdf-modal";

import { Comments } from "../comments";
import { CourseActions } from "./course-actions";
type ModalKind = "question" | "leaderboard" | "exam" | "pdf" | null;
const SESSION_LEVEL_KEY = "itlegend-session-level-v2";

const MODAL_STYLES = {
  exam: "h-[min(100dvh,620px)] max-h-dvh w-[min(90%,384px)] gap-0 overflow-hidden rounded-[22px] border-0 bg-(--exam-blue) p-0 text-white shadow-2xl",
  pdf: "h-[94dvh] w-[min(90%,900px)] max-w-150 gap-0 overflow-hidden rounded-xl p-6 sm:p-8",
  question: "top-1/2 -translate-y-1/2 sm:px-6 md:px-6 lg:px-6",
  leaderboard: "max-h-[92dvh] w-[min(90%,600px)]",
};

export function CourseShell() {
  const [modal, setModal] = useState<ModalKind>(null);
  const [sessionLevel, setSessionLevel] = useState(0);

  useEffect(() => {
    const saved = Number(sessionStorage.getItem(SESSION_LEVEL_KEY));
    if (Number.isFinite(saved) && saved >= 0 && saved <= 100) {
      setSessionLevel(saved);
    }
  }, []);

  const handleLevelChange = (level: number) => {
    setSessionLevel(level);
    sessionStorage.setItem(SESSION_LEVEL_KEY, String(level));
  };

  return (
    <>
      <div className="wrapper grid course-grid gap-y-0 min-[900px]:gap-x-8 xl:gap-x-12 pt-5 pb-24">
        <CourseVideo />
        <CourseActions onOpenModal={setModal} />
        <CourseMaterials />
        <CourseOutline
          onExam={() => setModal("exam")}
          onPdf={() => setModal("pdf")}
          sessionLevel={sessionLevel}
        />
        <Comments />
      </div>

      <Dialog
        open={modal !== null}
        onOpenChange={(open) => {
          if (!open) setModal(null);
        }}
      >
        <DialogContent
          aria-labelledby="modal-title"
          showClose={modal !== "exam"}
          className={modal ? MODAL_STYLES[modal] : ""}
        >
          {modal === "question" && (
            <QuestionModal onClose={() => setModal(null)} />
          )}
          {modal === "leaderboard" && (
            <LeaderboardModal percent={sessionLevel} />
          )}
          {modal === "exam" && (
            <ExamModal
              onProgressAction={handleLevelChange}
              onCloseAction={() => setModal(null)}
            />
          )}
          {modal === "pdf" && <PdfModal />}
        </DialogContent>
      </Dialog>
    </>
  );
}
