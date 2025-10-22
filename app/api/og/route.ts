import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const DEFAULT_TITLE = "Dr. Macky — Scientific Explorations";
const MAX_TITLE_LENGTH = 120;

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const rawTitle = searchParams.get("title") ?? "";
  const title = rawTitle.trim().slice(0, MAX_TITLE_LENGTH);
  const finalTitle = title.length > 0 ? title : DEFAULT_TITLE;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #020617 0%, #0f172a 60%, #1e293b 100%)",
          color: "#f8fafc",
          padding: "64px",
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 36,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          <span>Dr. Macky</span>
          <span>scientific.blog</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <span
            style={{
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 900,
              wordBreak: "break-word",
            }}
          >
            {finalTitle}
          </span>
          <span
            style={{
              fontSize: 32,
              opacity: 0.7,
            }}
          >
            Insights &amp; research-driven stories
          </span>
        </div>
        <div
          style={{
            fontSize: 28,
            opacity: 0.6,
          }}
        >
          drmacky.ir
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Content-Type": "image/png",
      },
    }
  );
}
