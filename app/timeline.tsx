"use client";

import { Fragment, useEffect, useRef, useState } from "react";

const WEEKS = [1, 2, 3, 4, 5, 6];

type Phase = { title: string; text: string };

export function Timeline({ phases, phaseLabel, weekLabel }: { phases: Phase[]; phaseLabel: string; weekLabel: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setOn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(ref.current!);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={on ? "tl on" : "tl"} ref={ref}>
      <div className="hd">{phaseLabel}</div>
      <div className="wk">
        {WEEKS.map((w) => (
          <div key={w}>{weekLabel} {w}</div>
        ))}
      </div>
      {phases.map((p, i) => (
        <Fragment key={p.title}>
          <div className="lb">
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </div>
          <div className="tr">
            <div className={`bar b${i + 1}`} />
          </div>
        </Fragment>
      ))}
    </div>
  );
}
