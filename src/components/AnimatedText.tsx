"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { ElementType } from "react";

interface AnimatedTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
}

export function AnimatedText({
  text,
  as: Component = "h1",
  className,
  id,
}: AnimatedTextProps) {
  return (
    <Component
      id={id}
      className={cn("inline-flex flex-wrap leading-none", className)}
    >
      {text.split(" ").map((word, i) => (
        <span key={i} className="mr-[0.25em] whitespace-nowrap">
          {word.split("").map((char, j) => (
            <motion.span
              key={j}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: (i * word.length + j) * 0.01,
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </Component>
  );
}
