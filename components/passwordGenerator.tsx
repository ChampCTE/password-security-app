// components/passwordGenerator.tsx
// password generator component
"use client";

import { useState } from "react";
import { tokens } from "@/app/page";
import { generatePasswordAPI } from "@/services/passwordGenerator";
import { getText } from "@/i18n";

export default function PasswordGenerator({ dark, lang }: { dark: boolean; lang: string }) {
  const [length, setLength] = useState(12);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const t = dark ? tokens.dark : tokens.light;
  const text = (key: string) => getText(lang, key);

  const options = [
    { label: text("generatorUppercase"), state: useUpper,   toggle: () => setUseUpper(!useUpper) },
    { label: text("generatorLowercase"), state: useLower,   toggle: () => setUseLower(!useLower) },
    { label: text("generatorNumbers"), state: useNumbers, toggle: () => setUseNumbers(!useNumbers) },
    { label: text("generatorSymbols"), state: useSymbols, toggle: () => setUseSymbols(!useSymbols) },
  ];

  const generatePassword = async () => {
    setLoading(true);
    setError("");
    setCopied(false);
    try {
      const res = await generatePasswordAPI({ length, useUpper, useLower, useNumbers, useSymbols });
      setPassword(res.password);
    } catch {
      setError(text("generatorError"));
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const card: React.CSSProperties = {
    background: t.cardBg,
    border: `1px solid ${t.border}`,
    borderRadius: "12px",
    padding: "1.1rem 1.25rem",
    marginBottom: "0.875rem",
    transition: "background 0.3s, border-color 0.3s",
  };

  return (
    <div style={{ maxWidth: "620px", margin: "0 auto", padding: "1.5rem", fontFamily: "system-ui, sans-serif" }}>

      <h2 style={{ fontSize: "20px", fontWeight: 600, display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.25rem", color: t.textPrimary, transition: "color 0.3s" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style={{ width: "22px", height: "22px", color: t.accent }} aria-hidden="true">
          <path fill="currentColor" d="M256 160L256 224L384 224L384 160C384 124.7 355.3 96 320 96C284.7 96 256 124.7 256 160zM192 224L192 160C192 89.3 249.3 32 320 32C390.7 32 448 89.3 448 160L448 224C483.3 224 512 252.7 512 288L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 288C128 252.7 156.7 224 192 224z"/>
        </svg>
        {text("generatorTitle")}
      </h2>

      <div style={card}>

        {/* SLIDER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, color: t.sectionTitle, margin: 0, textTransform: "uppercase", letterSpacing: "0.07em" }}>{text("generatorLength")}</p>
          <span style={{ fontSize: "18px", fontWeight: 600, color: t.accent }}>{length}</span>
        </div>
        <input
          type="range" min="6" max="32" value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          style={{ width: "100%", accentColor: t.accent } as React.CSSProperties}
        />

        {/* OPTIONS */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", margin: "1rem 0" }}>
          {options.map(({ label, state, toggle }) => (
            <button
              key={label}
              onClick={toggle}
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                textAlign: "center",
                transition: "all 0.15s ease",
                border: state ? `1.5px solid ${t.accent}` : `1px solid ${t.border}`,
                background: state ? t.accentBg : t.inputBg,
                color: state ? t.accentText : t.textSecondary,
                fontWeight: state ? 600 : 400,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* GENERATE */}
        <button
          onClick={generatePassword}
          disabled={loading}
          style={{
            width: "100%",
            padding: "11px",
            background: loading ? t.border : t.accent,
            color: dark ? "#0F172A" : "#FFFFFF",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "15px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginTop: "4px",
            transition: "background 0.3s",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? (
            // Spinner SVG
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"
              style={{ animation: "spin 0.8s linear infinite" }}>
              <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
          )}
          {loading ? text("generatorGenerating") : text("generatorGenerate")}
        </button>

        {/* ERROR */}
        {error && (
          <p style={{ margin: "10px 0 0", fontSize: "13px", color: "#E24B4A", display: "flex", alignItems: "center", gap: "6px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: "14px", height: "14px", flexShrink: 0 }}>
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.29 13.71a1 1 0 0 1-1.42 0L12 13.41l-2.88 2.88a1 1 0 0 1-1.42-1.42L10.59 12 7.7 9.12a1 1 0 1 1 1.42-1.42L12 10.59l2.88-2.88a1 1 0 0 1 1.42 1.42L13.41 12l2.88 2.88a1 1 0 0 1 0 1.42z"/>
            </svg>
            {error}
          </p>
        )}
      </div>

      {/* OUTPUT */}
      {password && (
        <div style={card}>
          <p style={{ fontSize: "11px", fontWeight: 600, color: t.sectionTitle, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{text("generatorGeneratedPassword")}</p>
          <p style={{ fontFamily: "monospace", fontSize: "16px", letterSpacing: "0.04em", wordBreak: "break-all", margin: "4px 0 12px", color: t.textPrimary }}>
            {password}
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={copyToClipboard}
              style={{
                padding: "7px 14px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.15s ease",
                background: copied ? t.accentBg : t.inputBg,
                color: copied ? t.accentText : t.accent,
                border: copied ? `1.5px solid ${t.accent}` : `1px solid ${t.inputBorder}`,
              }}
            >
              {copied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style={{ width: "14px", height: "14px" }} aria-hidden="true">
                    <path fill="currentColor" d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/>
                  </svg>
                  {text("generatorCopied")}
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style={{ width: "14px", height: "14px" }} aria-hidden="true">
                    <path fill="currentColor" d="M448 96L439.4 96C428.4 76.9 407.7 64 384 64L256 64C232.3 64 211.6 76.9 200.6 96L192 96C156.7 96 128 124.7 128 160L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 160C512 124.7 483.3 96 448 96zM264 176C250.7 176 240 165.3 240 152C240 138.7 250.7 128 264 128L376 128C389.3 128 400 138.7 400 152C400 165.3 389.3 176 376 176L264 176z"/>
                  </svg>
                  {text("generatorCopy")}
                </>
              )}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}