"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Expand, Minimize, Play } from "lucide-react";

const demoVideoId = "w3m5nnCX60E";

export function CourseVideo() {
  const [wide, setWide] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const syncFullscreen = () => setWide(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () =>
      document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  const toggleWide = async () => {
    const player = document.getElementById("course-video");
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => undefined);
      setWide(false);
      return;
    }
    setWide(true);
    if (player?.requestFullscreen) {
      await player.requestFullscreen();
    }
  };

  return (
    <div
      id="course-video"
      className={`[grid-area:player] relative isolate aspect-video w-full overflow-hidden rounded-[5px] bg-[#111] max-[560px]:sticky max-[560px]:top-0 max-[560px]:z-20 max-[560px]:rounded-[10px] ${
        wide ? "is-wide" : ""
      }`}
      role="group"
      aria-label="SEO tutorial video player"
    >
      {!isPlaying ? (
        <div
          className="relative h-full w-full cursor-pointer group"
          onClick={() => setIsPlaying(true)}
        >
          <Image
            src="/images/jpeg-optimizer_course-video-poster-cropped.png"
            alt="SEO tutorial for beginners poster"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors group-hover:bg-black/40">
            <div className="size-16 sm:size-20 rounded-full bg-white text-primary-foreground flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
              <Play className="size-6 sm:size-8 fill-red-500 ml-1" />
            </div>
          </div>
        </div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${demoVideoId}?autoplay=1&rel=0&hl=en`}
          title="SEO tutorial for beginners"
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}

      <div className="absolute right-3 bottom-3 z-30 pointer-events-auto">
        <Button
          variant="ghost"
          className="inline-flex min-h-9 min-w-9 items-center justify-center gap-2 rounded-md border-0 bg-black/45 px-3 text-[12px] text-white backdrop-blur-sm hover:bg-black/65"
          onClick={toggleWide}
          aria-pressed={wide}
          aria-label={wide ? "Return to standard view" : "Expand video player"}
          title={wide ? "Standard view" : "Wide view"}
        >
          {wide ? (
            <Minimize size={16} aria-hidden="true" />
          ) : (
            <Expand size={16} aria-hidden="true" />
          )}
          <span>{wide ? "Standard" : "Wide"}</span>
        </Button>
      </div>
    </div>
  );
}
