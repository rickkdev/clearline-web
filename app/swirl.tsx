"use client";

import { useEffect, useRef } from "react";

const PATH =
  "M100 0 C190 80 190 165 100 245 S10 410 100 490 S190 655 100 735 S10 900 100 980";

const FIELDS = [
  {
    side: "r",
    top: 40,
    title: "Service & Kommunikation",
    text: "Anfragen aus Hotline, E-Mail und Chat vorsortieren und beantworten.",
    result: "Kürzere Reaktionszeiten, entlastetes Team",
  },
  {
    side: "l",
    top: 290,
    title: "Zahlungsverkehr & Backoffice",
    text: "Belege erfassen, abgleichen, Ausnahmen zur Klärung vorbereiten.",
    result: "Weniger manuelle Prüfschritte",
  },
  {
    side: "r",
    top: 535,
    title: "Angebotsvorlagen, Vertrieb & CRM",
    text: "Angebote aus Vorlagen erstellen, Anfragen qualifizieren, CRM-Daten aktuell halten.",
    result: "Schnellere Angebote, saubere Daten",
  },
  {
    side: "l",
    top: 780,
    title: "Softwareentwicklung",
    text: "KI-gestütztes Entwickeln mit sauberem Code und passendem Tooling.",
    result: "Kürzere Projektlaufzeiten",
  },
] as const;

export function Swirl() {
  const swirlRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const swirl = swirlRef.current!;
    const fg = fgRef.current!;
    const dot = dotRef.current!;
    const length = fg.getTotalLength();
    fg.style.strokeDasharray = String(length);

    function update() {
      if (window.innerWidth <= 760) {
        fg.style.strokeDashoffset = "0";
        dot.style.transform = "";
        return;
      }
      const rect = swirl.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, (window.innerHeight * 0.6 - rect.top) / rect.height),
      );
      const point = fg.getPointAtLength(progress * length);
      fg.style.strokeDashoffset = String(length * (1 - progress));
      dot.style.transform = `translate(${point.x}px,${(point.y * rect.height) / 980}px)`;
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="swirl" ref={swirlRef}>
      <div className="track" aria-hidden="true">
        <svg width="200" height="980" viewBox="0 0 200 980">
          <path d={PATH} fill="none" stroke="#D8D8D8" strokeWidth="2" />
          <path ref={fgRef} d={PATH} fill="none" stroke="#F18A00" strokeWidth="2" />
        </svg>
        <div className="dot" ref={dotRef} />
      </div>
      {FIELDS.map((f, i) => (
        <div key={f.title} className={`si ${f.side}`} style={{ top: f.top }}>
          <span className="n">{String(i + 1).padStart(2, "0")}</span>
          <h3>{f.title}</h3>
          <p>{f.text}</p>
          <div className="del">→ {f.result}</div>
        </div>
      ))}
    </div>
  );
}
