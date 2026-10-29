"use client";

import type { ReactNode } from "react";

const CALENDLY_URL = "https://calendly.com/mail-rick/30min";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
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
