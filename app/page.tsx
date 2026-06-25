//app/page.tsx
// Home page for the password security app
"use client";

import { useEffect, useState } from "react";
import PasswordAnalyzer from "@/components/passwordAnalyzer";
import PasswordGenerator from "@/components/passwordGenerator";
import { setLanguage, getLanguage, getText, type Language } from "@/i18n";

export default function Home() {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [lang, setLang] = useState<Language>("en");
  const [openLang, setOpenLang] = useState(false);

  const changeLang = (language: Language) => {
    setLanguage(language);
    setLang(language);
    setOpenLang(false);
  };

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setLang(getLanguage());
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
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
  
  // Function to get translated text based on the current language
  const languages: Array<{ code: Language; flagClass: string; label: string }> = [
    { code: "es", flagClass: "fi fi-es", label: "Español" },
    { code: "en", flagClass: "fi fi-gb", label: "English" },
    { code: "de", flagClass: "fi fi-de", label: "Deutsch" },
    { code: "fr", flagClass: "fi fi-fr", label: "Français" },
    { code: "ca", flagClass: "fi fi-es-ct", label: "Català" },
    { code: "mk", flagClass: "fi fi-mk", label: "Македонски" },
    { code: "ja", flagClass: "fi fi-jp", label: "日本語" },
    { code: "ko", flagClass: "fi fi-kr", label: "한국어" },
    { code: "zh-CN", flagClass: "fi fi-cn", label: "中文" },
  ];
  const pageTitle = getText(lang, "homeTitle");
  const pageSubtitle = getText(lang, "homeSubtitle");
  const footerBuiltBy = getText(lang, "footerBuiltBy");
  const footerViewSource = getText(lang, "footerViewSource");

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
            {pageTitle}
          </h1>
          <p style={{
            fontSize: "15px",
            color: t.textSecondary,
            margin: 0,
            fontFamily: "system-ui, sans-serif",
            transition: "color 0.3s",
          }}>
            {pageSubtitle}
          </p>
        </div>

        <PasswordAnalyzer dark={dark} lang={lang} />

        <div style={{
          maxWidth: "620px",
          margin: "0 auto 0.5rem",
          borderTop: `1px solid ${t.border}`,
          transition: "border-color 0.3s",
        }} />

        <PasswordGenerator dark={dark} lang={lang} />

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
          {footerBuiltBy}{" "}
          <a href="https://github.com/ChampCTE" target="_blank" rel="noopener noreferrer"
            style={{ color: t.accent, textDecoration: "none", fontWeight: 500 }}>
            Cèlia Trulla
          </a>
          {" · "}
          <a href="https://github.com/ChampCTE/password-security-app" target="_blank" rel="noopener noreferrer"
            style={{ color: t.accent, textDecoration: "none", fontWeight: 500 }}>
            {footerViewSource}
          </a>
          {" · "}
          {new Date().getFullYear()}
        </p>
      </footer>

      {/* DARK / LIGHT MODE */}
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

      {/* LANGUAGE SELECTOR */}
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "80px",
          zIndex: 999,
        }}
      >
        <button
          onClick={() => setOpenLang(!openLang)}
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            border: `1px solid ${t.border}`,
            background: t.cardBg,
            cursor: "pointer",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            width="20"
            height="20"
            fill={t.accent}
            aria-hidden="true"
          >
            <path d="M415.9 344L225 344C227.9 408.5 242.2 467.9 262.5 511.4C273.9 535.9 286.2 553.2 297.6 563.8C308.8 574.3 316.5 576 320.5 576C324.5 576 332.2 574.3 343.4 563.8C354.8 553.2 367.1 535.8 378.5 511.4C398.8 467.9 413.1 408.5 416 344zM224.9 296L415.8 296C413 231.5 398.7 172.1 378.4 128.6C367 104.2 354.7 86.8 343.3 76.2C332.1 65.7 324.4 64 320.4 64C316.4 64 308.7 65.7 297.5 76.2C286.1 86.8 273.8 104.2 262.4 128.6C242.1 172.1 227.8 231.5 224.9 296zM176.9 296C180.4 210.4 202.5 130.9 234.8 78.7C142.7 111.3 74.9 195.2 65.5 296L176.9 296zM65.5 344C74.9 444.8 142.7 528.7 234.8 561.3C202.5 509.1 180.4 429.6 176.9 344L65.5 344zM463.9 344C460.4 429.6 438.3 509.1 406 561.3C498.1 528.6 565.9 444.8 575.3 344L463.9 344zM575.3 296C565.9 195.2 498.1 111.3 406 78.7C438.3 130.9 460.4 210.4 463.9 296L575.3 296z" />
          </svg>
        </button>

        {openLang && (
          <div
            style={{
              position: "absolute",
              bottom: "52px",
              right: 0,
              background: t.cardBg,
              border: `1px solid ${t.border}`,
              borderRadius: "10px",
              padding: "6px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              minWidth: "140px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            }}
          >
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => changeLang(l.code)}
                style={{
                  background: lang === l.code ? t.accentBg : "transparent",
                  border: "none",
                  padding: "6px 8px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  textAlign: "left",
                  color: t.textPrimary,
                  fontSize: "13px",
                }}
              >
                <span
                  className={l.flagClass}
                  style={{ marginRight: "8px", fontSize: "14px" }}
                  aria-hidden="true"
                />
                <span>{l.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
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