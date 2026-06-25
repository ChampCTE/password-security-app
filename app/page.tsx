//app/page.tsx
"use client";

import { useEffect, useState } from "react";
import PasswordAnalyzer from "@/components/passwordAnalyzer";
import PasswordGenerator from "@/components/passwordGenerator";

export default function Home() {
  const [dark, setDark] = useState(false);
  // Detect system preference for dark mode
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.setAttribute("data-theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
    }
  }, [dark]);

  const t = dark ? tokens.dark : tokens.light;

  return (
    <>
      <style>{globalStyles}</style>

      <main style={{
        minHeight: "100vh",
        background: t.bg,
        padding: "48px 24px 32px",
        transition: "background 0.3s",
      }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 style={{
            fontSize: "28px",
            fontWeight: 700,
            color: t.textPrimary,
            margin: "0 0 8px",
            fontFamily: "system-ui, sans-serif",
            transition: "color 0.3s",
          }}>
            Password Security Tool
          </h1>
          <p style={{
            fontSize: "15px",
            color: t.textSecondary,
            margin: 0,
            fontFamily: "system-ui, sans-serif",
            transition: "color 0.3s",
          }}>
            Analyze the strength of your passwords and generate secure ones!!
          </p>
        </div>

        <PasswordAnalyzer dark={dark} />

        <div style={{
          maxWidth: "620px",
          margin: "0 auto 0.5rem",
          borderTop: `1px solid ${t.border}`,
          transition: "border-color 0.3s",
        }} />

        <PasswordGenerator dark={dark} />

      </main>

      {/* FOOTER */}
      <footer style={{
        borderTop: `1px solid ${t.border}`,
        padding: "20px 24px",
        textAlign: "center",
        background: t.cardBg,
        fontFamily: "system-ui, sans-serif",
        transition: "background 0.3s, border-color 0.3s",
      }}>
        <p style={{ margin: 0, fontSize: "13px", color: t.textSecondary }}>
          Built by{" "}
          <a href="https://github.com/ChampCTE" target="_blank" rel="noopener noreferrer"
            style={{ color: t.accent, textDecoration: "none", fontWeight: 500 }}>
            Cèlia Trulla
          </a>
          {" · "}
          <a href="https://github.com/ChampCTE/password-security-app" target="_blank" rel="noopener noreferrer"
            style={{ color: t.accent, textDecoration: "none", fontWeight: 500 }}>
            View source
          </a>
          {" · "}
          {new Date().getFullYear()}
        </p>
      </footer>

      {/* TOGGLE SOL / LUNA */}
      <button
        onClick={() => setDark(!dark)}
        aria-label="Toggle dark mode"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          border: `1px solid ${t.border}`,
          background: t.cardBg,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: dark
            ? "0 2px 12px rgba(0,0,0,0.5)"
            : "0 2px 12px rgba(0,0,0,0.12)",
          transition: "all 0.3s",
          zIndex: 999,
        }}
      >
        {dark ? <SunIcon color="#22C55E" /> : <MoonIcon color="#2563EB" />}
      </button>
    </>
  );
}

// Tokens for light and dark themes
export const tokens = {
  light: {
    bg:            "#FFFFFF",
    cardBg:        "#F8FAFC",
    border:        "#E2E8F0",
    textPrimary:   "#1E293B",
    textSecondary: "#64748B",
    accent:        "#2563EB",
    accentBg:      "#EFF6FF",
    accentText:    "#1D4ED8",
    inputBg:       "#FFFFFF",
    inputBorder:   "#CBD5E1",
    barBg:         "#E2E8F0",
    listDivider:   "#F1F5F9",
    sectionTitle:  "#94A3B8",
  },
  dark: {
    bg:            "#0F172A",
    cardBg:        "#1E293B",
    border:        "#334155",
    textPrimary:   "#F1F5F9",
    textSecondary: "#94A3B8",
    accent:        "#22C55E",
    accentBg:      "#14532D33",
    accentText:    "#22C55E",
    inputBg:       "#0F172A",
    inputBorder:   "#475569",
    barBg:         "#334155",
    listDivider:   "#1E293B",
    sectionTitle:  "#64748B",
  },
};

function SunIcon({ color }: { color: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon({ color }: { color: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

// Global styles for the entire app
const globalStyles = `
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }
  input[type="range"] { accent-color: var(--accent, #2563EB); }
`;