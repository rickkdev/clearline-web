import Image from "next/image";

export function HeroImage({ alt }: { alt: string }) {
  return (
    <div className="hero-media">
      <svg className="hero-clip-defs" width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id="hero-teardrop" clipPathUnits="objectBoundingBox">
            <path d="M 1 0 C .87 .29 1 .59 .81 .81 C .62 1.04 .27 1.01 .12 .79 C -.04 .56 .08 .28 .33 .22 C .59 .16 .78 .19 1 0 Z" />
          </clipPath>
        </defs>
      </svg>
      <Image className="hero-image" src="/hero-workshop.jpg" alt={alt} fill loading="eager" fetchPriority="high" sizes="(max-width: 760px) 100vw, 50vw" />
    </div>
  );
}
