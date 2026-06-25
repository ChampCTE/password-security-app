//components/passwordAnalyzer.tsx
//password strength analyzer component
// components/passwordAnalyzer.tsx
"use client";

import React, { useEffect, useState } from "react";
import { tokens } from "@/app/page";
import { analyzePasswordAPI } from "@/services/passwordAnalyzer";
import { AnalyzePasswordResponse } from "@/types/password";

const ErrorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: "15px", height: "15px", flexShrink: 0, marginTop: "2px" }}>
    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.29 13.71a1 1 0 0 1-1.42 0L12 13.41l-2.88 2.88a1 1 0 0 1-1.42-1.42L10.59 12 7.7 9.12a1 1 0 1 1 1.42-1.42L12 10.59l2.88-2.88a1 1 0 0 1 1.42 1.42L13.41 12l2.88 2.88a1 1 0 0 1 0 1.42z"/>
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style={{ width: "15px", height: "15px", flexShrink: 0, marginTop: "2px" }}>
    <path fill="currentColor" d="M420.9 448C428.2 425.7 442.8 405.5 459.3 388.1C492 353.7 512 307.2 512 256C512 150 426 64 320 64C214 64 128 150 128 256C128 307.2 148 353.7 180.7 388.1C197.2 405.5 211.9 425.7 219.1 448L420.8 448zM416 496L224 496L224 512C224 556.2 259.8 592 304 592L336 592C380.2 592 416 556.2 416 512L416 496zM312 176C272.2 176 240 208.2 240 248C240 261.3 229.3 272 216 272C202.7 272 192 261.3 192 248C192 181.7 245.7 128 312 128C325.3 128 336 138.7 336 152C336 165.3 325.3 176 312 176z"/>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style={{ width: "15px", height: "15px", flexShrink: 0, marginTop: "2px" }}>
    <path fill="currentColor" d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/>
  </svg>
);

const ShowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style={{ width: "18px", height: "18px" }}>
    <path fill="currentColor" d="M320 144C254.8 144 201.2 173.6 160.1 211.7C121.6 247.5 95 290 81.4 320C95 350 121.6 392.5 160.1 428.3C201.2 466.4 254.8 496 320 496C385.2 496 438.8 466.4 479.9 428.3C518.4 392.5 545 350 558.6 320C545 290 518.4 247.5 479.9 211.7C438.8 173.6 385.2 144 320 144zM127.4 176.6C174.5 132.8 239.2 96 320 96C400.8 96 465.5 132.8 512.6 176.6C559.4 220.1 590.7 272 605.6 307.7C608.9 315.6 608.9 324.4 605.6 332.3C590.7 368 559.4 420 512.6 463.4C465.5 507.1 400.8 544 320 544C239.2 544 174.5 507.2 127.4 463.4C80.6 419.9 49.3 368 34.4 332.3C31.1 324.4 31.1 315.6 34.4 307.7C49.3 272 80.6 220 127.4 176.6zM320 400C364.2 400 400 364.2 400 320C400 290.4 383.9 264.5 360 250.7C358.6 310.4 310.4 358.6 250.7 360C264.5 383.9 290.4 400 320 400zM240.4 311.6C242.9 311.9 245.4 312 248 312C283.3 312 312 283.3 312 248C312 245.4 311.8 242.9 311.6 240.4C274.2 244.3 244.4 274.1 240.5 311.5z"/>
  </svg>
);

const HideIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style={{ width: "18px", height: "18px" }}>
    <path fill="currentColor" d="M73 39.1C63.6 29.7 48.4 29.7 39.1 39.1C29.8 48.5 29.7 63.7 39 73.1L567 601.1C576.4 610.5 591.6 610.5 600.9 601.1C610.2 591.7 610.3 576.5 600.9 567.2L504.5 470.8C507.2 468.4 509.9 466 512.5 463.6C559.3 420.1 590.6 368.2 605.5 332.5C608.8 324.6 608.8 315.8 605.5 307.9C590.6 272.2 559.3 220.2 512.5 176.8C465.4 133.1 400.7 96.2 319.9 96.2C263.1 96.2 214.3 114.4 173.9 140.4L73 39.1zM236.5 202.7C260 185.9 288.9 176 320 176C399.5 176 464 240.5 464 320C464 351.1 454.1 379.9 437.3 403.5L402.6 368.8C415.3 347.4 419.6 321.1 412.7 295.1C399 243.9 346.3 213.5 295.1 227.2C286.5 229.5 278.4 232.9 271.1 237.2L236.4 202.5zM357.3 459.1C345.4 462.3 332.9 464 320 464C240.5 464 176 399.5 176 320C176 307.1 177.7 294.6 180.9 282.7L101.4 203.2C68.8 240 46.4 279 34.5 307.7C31.2 315.6 31.2 324.4 34.5 332.3C49.4 368 80.7 420 127.5 463.4C174.6 507.1 239.3 544 320.1 544C357.4 544 391.3 536.1 421.6 523.4L357.4 459.2z"/>
  </svg>
);

export default function PasswordAnalyzer({ dark }: { dark: boolean }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState<AnalyzePasswordResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const t = dark ? tokens.dark : tokens.light;

  // Debounce: llama a la API 400ms después de que el usuario deja de escribir
  useEffect(() => {
    if (!password) {
      setResult(null);
      setApiError("");
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setApiError("");
      try {
        const data = await analyzePasswordAPI({ password });
        setResult(data);
      } catch {
        setApiError("Could not analyze password. Please try again.");
        setResult(null);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [password]);

  const score = result?.score ?? 0;

  const getIssues = (pw: string) => {
    const issues: React.ReactNode[] = [];
    if (!pw) return issues;
    if (pw.length < 12) issues.push(<span key="length"><ErrorIcon /> Too short, use at least 12 characters</span>);
    if (!/[a-z]/.test(pw)) issues.push(<span key="lowercase"><ErrorIcon /> Add lowercase letters</span>);
    if (!/[0-9]/.test(pw)) issues.push(<span key="numbers"><ErrorIcon /> Add numbers</span>);
    if (!/[^A-Za-z0-9]/.test(pw)) issues.push(<span key="symbols"><ErrorIcon /> Add symbols like !@#$%</span>);
    if (/(1234|abcd|qwerty|1111|aaaa)/i.test(pw)) issues.push(<span key="patterns"><ErrorIcon /> Avoid common patterns like '1234' or 'qwerty'</span>);
    return issues;
  };

  const getAdvice = (pw: string) => {
    const advice: React.ReactNode[] = [];
    if (!pw) return advice;
    if (pw.length < 12) advice.push(<span key="length-advice"><InfoIcon /> Use at least 12–16 characters for greater security</span>);
    if (!/[A-Z]/.test(pw)) advice.push(<span key="uppercase-advice"><InfoIcon /> Add uppercase letters to increase entropy</span>);
    if (!/[0-9]/.test(pw)) advice.push(<span key="numbers-advice"><InfoIcon /> Include numbers for better security</span>);
    if (!/[^A-Za-z0-9]/.test(pw)) advice.push(<span key="symbols-advice"><InfoIcon /> Use symbols like !@#$% to strengthen security</span>);
    if (score <= 2) advice.push(<span key="vulnerable-advice"><InfoIcon /> Vulnerable to dictionary or brute force attacks</span>);
    if (score === 4) advice.push(<span key="strong-advice"><CheckIcon /> Good password, hard to crack</span>);
    return advice;
  };

  const getLabel = (s: number) => {
    switch (s) {
      case 0: case 1: return "Weak";
      case 2: return "Medium";
      case 3: return "Strong";
      case 4: return "Excellent";
      default: return "";
    }
  };

  const getStrengthColor = (s: number) => {
    switch (s) {
      case 0: case 1: return "#E24B4A";
      case 2: return "#EF9F27";
      case 3: return dark ? "#22C55E" : "#2563EB";
      case 4: return "#16A34A";
      default: return t.border;
    }
  };

  const issues = getIssues(password);
  const advice = getAdvice(password);

  const card: React.CSSProperties = {
    background: t.cardBg,
    border: `1px solid ${t.border}`,
    borderRadius: "12px",
    padding: "1.1rem 1.25rem",
    marginBottom: "0.875rem",
    transition: "background 0.3s, border-color 0.3s",
  };

  const fieldLabel: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 600,
    color: t.sectionTitle,
    margin: "0 0 6px",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
  };

  return (
    <div style={{ maxWidth: "620px", margin: "0 auto", padding: "1.5rem", fontFamily: "system-ui, sans-serif" }}>

      <h1 style={{ fontSize: "20px", fontWeight: 600, display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.25rem", color: t.textPrimary, transition: "color 0.3s" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style={{ width: "22px", height: "22px", color: t.accent }}>
          <path fill="currentColor" d="M416 160C416 124.7 444.7 96 480 96C515.3 96 544 124.7 544 160L544 192C544 209.7 558.3 224 576 224C593.7 224 608 209.7 608 192L608 160C608 89.3 550.7 32 480 32C409.3 32 352 89.3 352 160L352 224L192 224C156.7 224 128 252.7 128 288L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 288C512 252.7 483.3 224 448 224L416 224L416 160z"/>
        </svg>
        Password Security Analyzer
      </h1>

      {/* INPUT */}
      <div style={card}>
        <p style={fieldLabel}>Enter your password</p>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password…"
            style={{
              flex: 1,
              width: "100%",
              padding: "10px 14px",
              fontSize: "15px",
              borderRadius: "8px",
              border: `1px solid ${t.inputBorder}`,
              background: t.inputBg,
              color: t.textPrimary,
              fontFamily: "monospace",
              boxSizing: "border-box",
              outline: "none",
              transition: "background 0.3s, border-color 0.3s, color 0.3s",
            }}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: `1px solid ${t.inputBorder}`,
              background: t.inputBg,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              color: t.accent,
              flexShrink: 0,
              transition: "background 0.3s, border-color 0.3s",
            }}
            aria-label="Toggle password visibility"
          >
            {showPassword ? <HideIcon /> : <ShowIcon />}
          </button>
        </div>

        {/* Indicador de carga bajo el input */}
        {loading && (
          <p style={{ margin: "8px 0 0", fontSize: "12px", color: t.textSecondary, display: "flex", alignItems: "center", gap: "6px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              style={{ animation: "spin 0.8s linear infinite", color: t.accent }}>
              <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
            Analyzing…
          </p>
        )}

        {/* Error de API */}
        {apiError && (
          <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#E24B4A", display: "flex", alignItems: "center", gap: "6px" }}>
            <ErrorIcon /> {apiError}
          </p>
        )}
      </div>

      {/* STRENGTH — solo si hay resultado de la API */}
      {result && password && (
        <div style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={fieldLabel}>Strength</p>
              <p style={{ fontSize: "18px", fontWeight: 600, margin: "2px 0 0", color: t.textPrimary }}>
                {getLabel(score)}
              </p>
            </div>
            <span style={{
              background: getStrengthColor(score) + "25",
              color: getStrengthColor(score),
              padding: "3px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 600,
              border: `1px solid ${getStrengthColor(score)}40`,
            }}>
              {score} / 4
            </span>
          </div>

          <div style={{ width: "100%", height: "6px", background: t.barBg, borderRadius: "99px", overflow: "hidden", margin: "12px 0 10px" }}>
            <div style={{ height: "6px", borderRadius: "99px", transition: "width 0.4s ease, background-color 0.3s", width: `${(score / 4) * 100}%`, backgroundColor: getStrengthColor(score) }} />
          </div>

          {result.crackTime && (
            <p style={{ fontSize: "13px", color: t.textSecondary, margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style={{ width: "13px", height: "13px", color: t.accent }}>
                <path fill="currentColor" d="M264.5 64C251.2 64 240.5 74.7 240.5 88C240.5 101.3 251.2 112 264.5 112L296.5 112L296.5 137.3C188.5 149.2 104.5 240.8 104.5 352C104.5 471.3 201.2 568 320.5 568C439.8 568 536.5 471.3 536.5 352C536.5 312.2 525.7 274.9 506.9 242.8L535.1 214.6C547.6 202.1 547.6 181.8 535.1 169.3C522.6 156.8 502.3 156.8 489.8 169.3L466.4 192.7C433.5 162.5 391.2 142.4 344.4 137.2L344.4 111.9L376.4 111.9C389.7 111.9 400.4 101.2 400.4 87.9C400.4 74.6 389.7 63.9 376.4 63.9L264.4 63.9zM344.5 248L344.5 352C344.5 365.3 333.8 376 320.5 376C307.2 376 296.5 365.3 296.5 352L296.5 248C296.5 234.7 307.2 224 320.5 224C333.8 224 344.5 234.7 344.5 248z"/>
              </svg>
              Cracking time: {result.crackTime}
            </p>
          )}
        </div>
      )}

      {/* ISSUES */}
      {issues.length > 0 && password && (
        <div style={card}>
          <p style={{ fontSize: "11px", fontWeight: 600, color: t.sectionTitle, textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 10px" }}>Issues detected</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {issues.map((issue, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", padding: "6px 0", borderBottom: `1px solid ${t.listDivider}`, lineHeight: "1.5", color: "#E24B4A" }}>{issue}</li>
            ))}
          </ul>
        </div>
      )}

      {/* TIPS */}
      {advice.length > 0 && password && (
        <div style={card}>
          <p style={{ fontSize: "11px", fontWeight: 600, color: t.sectionTitle, textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 10px" }}>Security tips</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {advice.map((a, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", padding: "6px 0", borderBottom: `1px solid ${t.listDivider}`, lineHeight: "1.5", color: t.accent }}>{a}</li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}