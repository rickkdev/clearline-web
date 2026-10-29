import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Riccardo Lamanna – Fractional Head of AI",
  description:
    "KI produktiv in Ihren Prozessen. Umgesetzt mit Fachbereich, IT und Kontrollfunktionen – für Banken und Finanzinstitute.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={outfit.variable}>
      <body>{children}</body>
    </html>
  );
}
