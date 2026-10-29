import { ImageResponse } from "next/og";

export const socialImageSize = { width: 1200, height: 630 };

export function socialImage(title: string, category: string) {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "64px 72px", background: "#f6f6f6", color: "#3e4543", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 26 }}><div style={{ width: 14, height: 32, background: "#f18a00" }} />{category}</div>
      <div style={{ display: "flex", fontSize: title.length > 75 ? 52 : 66, lineHeight: 1.08, fontWeight: 700, maxWidth: 1056 }}>{title}</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px solid #d8d8d8", paddingTop: 24, fontSize: 27 }}><span>Rick Lamanna</span><span>Freelance · Applied AI Engineering</span></div>
    </div>,
    socialImageSize,
  );
}
