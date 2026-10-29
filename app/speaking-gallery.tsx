"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const PHOTOS = [
  {
    src: "/speaking/ai-politik-berlin.jpg",
    alt: "Riccardo Lamanna mit deutschen Politikern und Veranstaltern bei AI Agents Berlin",
    caption: "KI, Agents und die Berlin-Wahl · AI Agents Berlin",
  },
  {
    src: "/speaking/agentic-summit-panel.webp",
    alt: "Riccardo Lamanna auf dem Panel When Agents Transact beim Agentic Summit in Tokio",
    caption: "When Agents Transact · Agentic Summit, Tokio",
  },
  {
    src: "/speaking/ai-community-talk.webp",
    alt: "Riccardo Lamanna spricht vor der KI-Community über selbstverbessernde AI-Agents",
    caption: "KI in der Praxis · Vortrag vor der Community",
  },
];

export function SpeakingGallery() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setInterval> | undefined;
    const update = () => {
      clearInterval(timer);
      if (!paused && !hovered && !motion.matches) {
        timer = setInterval(() => setCurrent((index) => (index + 1) % PHOTOS.length), 5000);
      }
    };
    update();
    motion.addEventListener("change", update);
    return () => {
      clearInterval(timer);
      motion.removeEventListener("change", update);
    };
  }, [paused, hovered]);

  return (
    <figure
      className="speaking-photo"
      aria-label="Vorträge und Auftritte"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setPaused(true)}
    >
      <div className="speaking-gallery-frame">
        {PHOTOS.map((photo, index) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={index === current ? photo.alt : ""}
            aria-hidden={index !== current}
            className={index === current ? "speaking-slide active" : "speaking-slide"}
            fill
            sizes="(max-width: 760px) 100vw, 480px"
            loading="eager"
          />
        ))}
      </div>
      <figcaption>{PHOTOS[current].caption}</figcaption>
      <div className="speaking-gallery-controls">
        <div className="speaking-gallery-dots">
          {PHOTOS.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              aria-label={`Bild ${index + 1} anzeigen`}
              aria-pressed={index === current}
              onClick={() => {
                setCurrent(index);
                setPaused(true);
              }}
            ><span /></button>
          ))}
        </div>
        <button className="speaking-gallery-pause" type="button" onClick={() => setPaused(!paused)}>
          {paused ? "Bildwechsel starten" : "Bildwechsel pausieren"}
        </button>
      </div>
    </figure>
  );
}
