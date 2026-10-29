import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { CalendlyWidget } from "./calendly";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Riccardo Lamanna – Fractional Head of AI",
  description:
    "KI produktiv in Ihren Prozessen. Umgesetzt mit Fachbereich, IT und Kontrollfunktionen – für den deutschen Mittelstand.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={outfit.variable}>
      <head>
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      </head>
      <body>{children}<CalendlyWidget /></body>
    </html>
  );
}
