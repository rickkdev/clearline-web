"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Point = [number, number];
type Anchor = { at: Point; in: Point; out: Point; period: [number, number, number]; phase: number };

const TIP: Point = [1, 0];
const TIP_OUT: Point = [0.87, 0.29];
const TIP_IN: Point = [0.78, 0.19];
const ANCHORS: Anchor[] = [
  { at: [0.81, 0.81], in: [1, 0.59], out: [0.62, 1.04], period: [9.1, 11.7, 13.3], phase: 0 },
  { at: [0.12, 0.79], in: [0.27, 1.01], out: [-0.04, 0.56], period: [10.3, 8.3, 12.1], phase: 2.1 },
  { at: [0.33, 0.22], in: [0.08, 0.28], out: [0.59, 0.16], period: [12.7, 9.7, 7.9], phase: 4.2 },
];
const DRIFT = 0.035;
const TURN = 0.14;
const SLOWDOWN = 2.4;

const f = (n: number) => n.toFixed(4);
const pt = ([x, y]: Point) => `${f(x)} ${f(y)}`;

function dropPath(seconds: number) {
  const moved = ANCHORS.map(({ at, in: handleIn, out, period: [px, py, pr], phase }) => {
    const dx = DRIFT * Math.sin((seconds * 2 * Math.PI) / px + phase);
    const dy = DRIFT * Math.sin((seconds * 2 * Math.PI) / py + phase * 1.7);
    const turn = TURN * Math.sin((seconds * 2 * Math.PI) / pr + phase * 0.6);
    const cos = Math.cos(turn);
    const sin = Math.sin(turn);
    const rotate = ([x, y]: Point): Point => {
      const rx = x - at[0];
      const ry = y - at[1];
      return [at[0] + rx * cos - ry * sin + dx, at[1] + rx * sin + ry * cos + dy];
    };
    return { at: [at[0] + dx, at[1] + dy] as Point, in: rotate(handleIn), out: rotate(out) };
  });
  const [a, b, c] = moved;
  return `M ${pt(TIP)} C ${pt(TIP_OUT)} ${pt(a.in)} ${pt(a.at)} C ${pt(a.out)} ${pt(b.in)} ${pt(b.at)} C ${pt(b.out)} ${pt(c.in)} ${pt(c.at)} C ${pt(c.out)} ${pt(TIP_IN)} ${pt(TIP)} Z`;
}

const RESTING_DROP = dropPath(0);

export function HeroImage({ alt }: { alt: string }) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = true;
    const start = performance.now();
    const tick = (now: number) => {
      pathRef.current?.setAttribute("d", dropPath((now - start) / 1000 / SLOWDOWN));
      frame = requestAnimationFrame(tick);
    };
    const update = () => {
      cancelAnimationFrame(frame);
      if (visible && !motion.matches) frame = requestAnimationFrame(tick);
      else pathRef.current?.setAttribute("d", RESTING_DROP);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    if (mediaRef.current) observer.observe(mediaRef.current);
    motion.addEventListener("change", update);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      motion.removeEventListener("change", update);
    };
  }, []);

  return (
    <div ref={mediaRef} className="hero-media">
      <svg className="hero-clip-defs" width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id="hero-teardrop" clipPathUnits="objectBoundingBox">
            <path ref={pathRef} d={RESTING_DROP} />
          </clipPath>
        </defs>
      </svg>
      <Image className="hero-image" src="/hero-workshop.jpg" alt={alt} fill loading="eager" fetchPriority="high" sizes="(max-width: 760px) 100vw, 50vw" />
    </div>
  );
}
