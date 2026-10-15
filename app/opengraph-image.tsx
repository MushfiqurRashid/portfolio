import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/data";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const portraitData = await readFile(join(process.cwd(), "public/images/portrait.png"), "base64");
const portraitSrc = `data:image/png;base64,${portraitData}`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#09090b",
          color: "#efebe4",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -180,
            top: -200,
            width: 900,
            height: 900,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(255,106,61,0.42), rgba(9,9,11,0) 62%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 96,
            bottom: 0,
            width: 380,
            height: 450,
            borderRadius: "190px 190px 0 0",
            background: "linear-gradient(180deg, rgba(255,106,61,0.95) 0%, rgba(255,140,70,0.45) 45%, rgba(9,9,11,0) 100%)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={portraitSrc} alt="" height={560} style={{ position: "absolute", right: 64, bottom: -20 }} />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, width: 760 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, color: "#8f8d96" }}>
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#34d399" }} />
            Open to new opportunities
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 128, fontWeight: 700, letterSpacing: -7, lineHeight: 0.88 }}>MUSHFIQUR</div>
            <div style={{ display: "flex", alignItems: "center", fontSize: 128, fontWeight: 700, letterSpacing: -7, lineHeight: 0.88 }}>
              RASHID
              <svg width="64" height="64" viewBox="0 0 24 24" style={{ marginLeft: 24 }}>
                <path
                  fill="#ff6a3d"
                  d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z"
                />
              </svg>
            </div>
            <div style={{ marginTop: 34, fontSize: 32, color: "#efebe4" }}>Software Engineer · Data Analyst</div>
            <div style={{ marginTop: 8, fontSize: 26, color: "#8f8d96" }}>Product Manager, Tech · Applied AI</div>
          </div>
          <div style={{ display: "flex", gap: 28, fontSize: 22, color: "#8f8d96" }}>
            <span>{site.location}</span>
            <span style={{ color: "#ff6a3d" }}>/</span>
            <span>{site.email}</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
