"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const PHOTOS = ["/speaking/hermes-2.jpeg", "/speaking/ai-agents-summit-1.jpg", "/speaking/ki-und-die-berlin-wahl.jpg"];

type Photo = { alt: string; caption: string };

export function SpeakingGallery({ photos, label }: { photos: Photo[]; label: string }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setInterval> | undefined;
    const update = () => {
      clearInterval(timer);
      if (!motion.matches) {
        timer = setInterval(() => setCurrent((index) => (index + 1) % PHOTOS.length), 2500);
      }
    };
    update();
    motion.addEventListener("change", update);
    return () => {
      clearInterval(timer);
      motion.removeEventListener("change", update);
    };
  }, []);

  return (
    <figure className="speaking-photo" aria-label={label}>
      <div className="speaking-gallery-frame">
        {photos.map((photo, index) => (
          <Image
            key={PHOTOS[index]}
            src={PHOTOS[index]}
            alt={index === current ? photo.alt : ""}
            aria-hidden={index !== current}
            className={index === current ? "speaking-slide active" : "speaking-slide"}
            fill
            sizes="(max-width: 760px) 100vw, 480px"
            loading="eager"
          />
        ))}
      </div>
      <figcaption>{photos[current].caption}</figcaption>
    </figure>
  );
}
