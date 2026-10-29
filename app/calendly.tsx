"use client";

import Script from "next/script";
import type { ReactNode } from "react";

const CALENDLY_URL = "https://calendly.com/mail-rick/30min";

declare global {
  interface Window {
    Calendly?: {
      initBadgeWidget: (options: {
        url: string;
        text: string;
        color: string;
        textColor: string;
        branding: boolean;
      }) => void;
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export function CalendlyWidget() {
  return (
    <Script
      src="https://assets.calendly.com/assets/external/widget.js"
      onReady={() => {
        if (document.querySelector(".calendly-badge-widget")) return;
        window.Calendly?.initBadgeWidget({
          url: CALENDLY_URL,
          text: "Schedule time with me",
          color: "#0069ff",
          textColor: "#ffffff",
          branding: true,
        });
      }}
    />
  );
}

export function BookingLink({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <a
      href={CALENDLY_URL}
      className={className}
      onClick={(event) => {
        if (!window.Calendly || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        window.Calendly.initPopupWidget({ url: CALENDLY_URL });
      }}
    >
      {children}
    </a>
  );
}
