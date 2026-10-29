"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotionPreference = () => {
      if (motion.matches) videoRef.current?.pause();
      else void videoRef.current?.play().catch(() => {});
    };
    applyMotionPreference();
    motion.addEventListener("change", applyMotionPreference);
    return () => motion.removeEventListener("change", applyMotionPreference);
  }, []);

  return (
    <div className="hero-media">
      <svg className="hero-clip-defs" width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id="hero-teardrop" clipPathUnits="objectBoundingBox">
            <path d="M 1 0 C .87 .29 1 .59 .81 .81 C .62 1.04 .27 1.01 .12 .79 C -.04 .56 .08 .28 .33 .22 C .59 .16 .78 .19 1 0 Z" />
          </clipPath>
        </defs>
      </svg>
      <Image className="hero-fallback" src="/hero-hq.webp" alt="Riccardo Lamanna" fill sizes="(max-width: 760px) 100vw, 50vw" />
      {!failed && (
        <video
          ref={videoRef}
          className="hero-video"
          src="/video/working-sequence-option-4.mp4"
          poster="/video/working-intro-poster.jpg"
          width={1080}
          height={1080}
          muted
          playsInline
          preload="none"
          aria-label="Riccardo Lamanna arbeitet an seinem Laptop"
          onEnded={() => {
            const video = videoRef.current;
            if (!video) return;
            video.currentTime = 7;
            void video.play().catch(() => {});
          }}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
