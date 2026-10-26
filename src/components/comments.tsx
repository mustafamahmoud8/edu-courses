"use client";

import { FormEvent, useState } from "react";
import { courseComments } from "@/data/dummy-data";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CourseComment } from "@/type/course";
import Image from "next/image";
import { AnimatedText } from "./AnimatedText";
import Motion from "./Motion";

const NEW_COMMENT_AUTHOR = {
  name: "You",
  avatar: "/images/comment-student-2.png",
  date: "Just now",
};

export function Comments() {
  const [comments, setComments] = useState<CourseComment[]>(courseComments);
  const [text, setText] = useState("");
  const [notice, setNotice] = useState("");

  const addComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) {
      setNotice("Please write a comment first.");
      return;
    }
    setComments((current) => [
      { id: `you-${Date.now()}`, ...NEW_COMMENT_AUTHOR, text: text.trim() },
      ...current,
    ]);
    setText("");
    setNotice("Your comment was added.");
  };

  return (
    <section
      id="comments"
      className="mt-10 [grid-area:comments]"
      aria-labelledby="comments-heading"
    >
      <AnimatedText
        as="h2"
        id="comments-heading"
        text="Comments"
        className="main-heading"
      />

      <div>
        {comments.map((comment, idx) => (
          <Motion key={comment.id} index={idx}>
            <article className="flex items-start gap-4 border-b border-border py-5 first:pt-1 last:border-0">
              <Image
                src={comment.avatar}
                alt={comment.name}
                width={100}
                height={100}
                className="size-20 sm:size-25 rounded-full object-cover -mt-4"
              />
              <div className="flex-1">
                <h3 className="text-sm font-semibold leading-normal text-gray-500">
                  {comment.name}
                </h3>
                <time className="mt-0.5 block text-[12px] font-medium leading-normal text-gray-400">
                  {comment.date}
                </time>
                <p className="mt-2.5 w-full max-w-md text-[13px] font-medium leading-[1.65] text-muted-foreground/70">
                  {comment.text}
                </p>
              </div>
            </article>
          </Motion>
        ))}
      </div>

      <form className="mt-7" onSubmit={addComment}>
        <label className="sr-only" htmlFor="comment">
          Write a comment
        </label>
        <textarea
          id="comment"
          name="comment"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Write a comment"
          className="block min-h-32 w-full resize-y rounded-md bg-card p-3 text-sm text-card-foreground shadow-[0_0_32px_rgba(20,28,33,.09)] outline-none placeholder:font-medium placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-ring"
        />

        <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">
          {notice}
        </p>

        <Button
          className="mt-5 min-w-42 rounded-sm py-3 text-base font-normal"
          type="submit"
        >
          Submit Review <ArrowRight className="size-4" />
        </Button>
      </form>
    </section>
  );
}
