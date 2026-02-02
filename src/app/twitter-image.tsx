import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F7F4EE",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 72,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            border: "1px solid rgba(27,27,26,0.12)",
            borderRadius: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                fontSize: 84,
                letterSpacing: "0.18em",
                color: "#1B1B1A",
              }}
            >
              NKN
            </div>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: "#B1002E",
              }}
            />
          </div>
        </div>
      </div>
    ),
    size
  );
}

