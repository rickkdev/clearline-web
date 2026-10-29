import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hero-Video auswählen – Riccardo Lamanna",
  robots: { index: false, follow: false },
};

const OPTIONS = [
  { number: "01", start: "00:00", end: "00:16" },
  { number: "02", start: "00:05", end: "00:21" },
  { number: "03", start: "00:10", end: "00:26" },
  { number: "04", start: "00:15", end: "00:31" },
  { number: "05", start: "00:20", end: "00:36" },
  { number: "06", start: "00:25", end: "00:41" },
  { number: "07", start: "00:30", end: "00:46" },
  { number: "08", start: "00:35", end: "00:51" },
  { number: "09", start: "00:40", end: "00:56" },
  { number: "10", start: "00:45", end: "01:00.9" },
];

export default function VideoOptionsPage() {
  return (
    <main className="video-options w">
      <header className="speaking-page-header">
        <Link className="lnk" href="/">← Zur Startseite</Link>
        <div className="tag">Hero-Video · Auswahl</div>
        <h1>Welcher Moment passt?</h1>
        <p className="intro">
          Zehn Ausschnitte aus Ihrer Aufnahme, jeweils etwa 16 Sekunden. Alle sind stumm,
          laufen in Schleife und zeigen denselben Bildausschnitt wie im Hero.
          Starten Sie die Vorschauen und nennen Sie mir Ihre favorisierte Nummer.
        </p>
        <p className="video-options-note">
          Die Zeitangaben beziehen sich auf das Originalvideo. Die Ausschnitte überlappen,
          damit Sie unterschiedliche Einstiege und Übergänge vergleichen können.
          Aktuell im Hero: 00:00–00:07 als Einstieg, danach 00:15–00:31 in Schleife.
        </p>
      </header>
      <div className="video-options-grid">
        {OPTIONS.map((option) => (
          <article className="video-option" key={option.number}>
            <div className="video-option-heading">
              <h2>Option {option.number}</h2>
              <span>{option.start}–{option.end}</span>
            </div>
            <video
              controls
              muted
              loop
              playsInline
              preload="none"
              width={720}
              height={720}
              poster={`/video-options/option-${option.number}.jpg`}
              aria-label={`Option ${option.number}, Originalvideo ${option.start} bis ${option.end}`}
            >
              <source src={`/video-options/option-${option.number}.mp4`} type="video/mp4" />
            </video>
          </article>
        ))}
      </div>
    </main>
  );
}
