//components/passwordAnalyzer.tsx
//password strength analyzer component
"use client";

import React, { useMemo, useState } from "react";
import zxcvbn from "zxcvbn-ts";

// SVG Icon Components
const ErrorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: "16px", height: "16px", display: "inline", flexShrink: 0, marginTop: "1px" }}>
    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.29 13.71a1 1 0 0 1-1.42 0L12 13.41l-2.88 2.88a1 1 0 0 1-1.42-1.42L10.59 12 7.7 9.12a1 1 0 1 1 1.42-1.42L12 10.59l2.88-2.88a1 1 0 0 1 1.42 1.42L13.41 12l2.88 2.88a1 1 0 0 1 0 1.42z"/>
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style={{ width: "16px", height: "16px", display: "inline", flexShrink: 0, marginTop: "1px" }}>
    <path fill="currentColor" d="M420.9 448C428.2 425.7 442.8 405.5 459.3 388.1C492 353.7 512 307.2 512 256C512 150 426 64 320 64C214 64 128 150 128 256C128 307.2 148 353.7 180.7 388.1C197.2 405.5 211.9 425.7 219.1 448L420.8 448zM416 496L224 496L224 512C224 556.2 259.8 592 304 592L336 592C380.2 592 416 556.2 416 512L416 496zM312 176C272.2 176 240 208.2 240 248C240 261.3 229.3 272 216 272C202.7 272 192 261.3 192 248C192 181.7 245.7 128 312 128C325.3 128 336 138.7 336 152C336 165.3 325.3 176 312 176z"/>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style={{ width: "16px", height: "16px", display: "inline", flexShrink: 0, marginTop: "1px" }}>
    <path fill="currentColor" d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/>
  </svg>
);

const ShowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style={{ width: "18px", height: "18px", display: "inline" }}>
    <path fill="currentColor" d="M320 144C254.8 144 201.2 173.6 160.1 211.7C121.6 247.5 95 290 81.4 320C95 350 121.6 392.5 160.1 428.3C201.2 466.4 254.8 496 320 496C385.2 496 438.8 466.4 479.9 428.3C518.4 392.5 545 350 558.6 320C545 290 518.4 247.5 479.9 211.7C438.8 173.6 385.2 144 320 144zM127.4 176.6C174.5 132.8 239.2 96 320 96C400.8 96 465.5 132.8 512.6 176.6C559.4 220.1 590.7 272 605.6 307.7C608.9 315.6 608.9 324.4 605.6 332.3C590.7 368 559.4 420 512.6 463.4C465.5 507.1 400.8 544 320 544C239.2 544 174.5 507.2 127.4 463.4C80.6 419.9 49.3 368 34.4 332.3C31.1 324.4 31.1 315.6 34.4 307.7C49.3 272 80.6 220 127.4 176.6zM320 400C364.2 400 400 364.2 400 320C400 290.4 383.9 264.5 360 250.7C358.6 310.4 310.4 358.6 250.7 360C264.5 383.9 290.4 400 320 400zM240.4 311.6C242.9 311.9 245.4 312 248 312C283.3 312 312 283.3 312 248C312 245.4 311.8 242.9 311.6 240.4C274.2 244.3 244.4 274.1 240.5 311.5z"/>
  </svg>
);

const HideIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style={{ width: "18px", height: "18px", display: "inline" }}>
    <path fill="currentColor" d="M73 39.1C63.6 29.7 48.4 29.7 39.1 39.1C29.8 48.5 29.7 63.7 39 73.1L567 601.1C576.4 610.5 591.6 610.5 600.9 601.1C610.2 591.7 610.3 576.5 600.9 567.2L504.5 470.8C507.2 468.4 509.9 466 512.5 463.6C559.3 420.1 590.6 368.2 605.5 332.5C608.8 324.6 608.8 315.8 605.5 307.9C590.6 272.2 559.3 220.2 512.5 176.8C465.4 133.1 400.7 96.2 319.9 96.2C263.1 96.2 214.3 114.4 173.9 140.4L73 39.1zM236.5 202.7C260 185.9 288.9 176 320 176C399.5 176 464 240.5 464 320C464 351.1 454.1 379.9 437.3 403.5L402.6 368.8C415.3 347.4 419.6 321.1 412.7 295.1C399 243.9 346.3 213.5 295.1 227.2C286.5 229.5 278.4 232.9 271.1 237.2L236.4 202.5zM357.3 459.1C345.4 462.3 332.9 464 320 464C240.5 464 176 399.5 176 320C176 307.1 177.7 294.6 180.9 282.7L101.4 203.2C68.8 240 46.4 279 34.5 307.7C31.2 315.6 31.2 324.4 34.5 332.3C49.4 368 80.7 420 127.5 463.4C174.6 507.1 239.3 544 320.1 544C357.4 544 391.3 536.1 421.6 523.4L357.4 459.2z"/>
  </svg>
);

export default function PasswordAnalyzer() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const result = useMemo(() => zxcvbn(password), [password]);
  const score = result.score;

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

  const getLabel = (score: number) => {
    switch (score) {
      case 0: case 1: return "Weak";
      case 2: return "Medium";
      case 3: return "Strong";
      case 4: return "Excellent";
      default: return "";
    }
  };

  const getColor = (score: number) => {
    switch (score) {
      case 0: case 1: return "#E24B4A";
      case 2: return "#EF9F27";
      case 3: return "#378ADD";
      case 4: return "#639922";
      default: return "var(--color-border-tertiary)";
    }
  };

  const issues = getIssues(password);
  const advice = getAdvice(password);

  return (
    <div style={styles.container}>

      {/* TITLE */}
      <h1 style={styles.title}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style={{ width: "24px", height: "24px", color: "#7F77DD" }}>
          <path fill="currentColor" d="M416 160C416 124.7 444.7 96 480 96C515.3 96 544 124.7 544 160L544 192C544 209.7 558.3 224 576 224C593.7 224 608 209.7 608 192L608 160C608 89.3 550.7 32 480 32C409.3 32 352 89.3 352 160L352 224L192 224C156.7 224 128 252.7 128 288L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 288C512 252.7 483.3 224 448 224L416 224L416 160z"/>
        </svg>
        Password Security Analyzer
      </h1>

      {/* INPUT */}
      <div style={styles.card}>
        <p style={styles.fieldLabel}>Enter your password</p>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password…"
            style={styles.input}
          />
          <button onClick={() => setShowPassword(!showPassword)} style={styles.iconButton} aria-label="Toggle password visibility">
            {showPassword ? <HideIcon /> : <ShowIcon />}
          </button>
        </div>
      </div>

      {/* STRENGTH RESULT */}
      {password && (
        <div style={styles.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={styles.fieldLabel}>Strength</p>
              <p style={{ fontSize: "18px", fontWeight: 500, margin: "2px 0 0", color: "var(--color-text-primary)" }}>
                {getLabel(score)}
              </p>
            </div>
            <span style={{
              background: getColor(score) + "22",
              color: getColor(score),
              padding: "3px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 500,
            }}>
              {score} / 4
            </span>
          </div>

          <div style={styles.barBg}>
            <div style={{ ...styles.barFill, width: `${(score / 4) * 100}%`, backgroundColor: getColor(score) }} />
          </div>

          <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style={{ width: "14px", height: "14px" }}>
              <path fill="currentColor" d="M344.5 248L344.5 352C344.5 365.3 333.8 376 320.5 376C307.2 376 296.5 365.3 296.5 352L296.5 248C296.5 234.7 307.2 224 320.5 224C333.8 224 344.5 234.7 344.5 248z"/>
            </svg>
            Cracking time: {result.crack_times_display?.offline_slow_hashing_1e5_per_second}
          </p>
        </div>
      )}

      {/* ISSUES */}
      {issues.length > 0 && (
        <div style={styles.card}>
          <p style={styles.sectionTitle}>Issues detected</p>
          <ul style={styles.list}>
            {issues.map((issue, i) => (
              <li key={i} style={{ ...styles.listItem, color: "#E24B4A" }}>{issue}</li>
            ))}
          </ul>
        </div>
      )}

      {/* TIPS */}
      {advice.length > 0 && (
        <div style={styles.card}>
          <p style={styles.sectionTitle}>Security tips</p>
          <ul style={styles.list}>
            {advice.map((a, i) => (
              <li key={i} style={{ ...styles.listItem, color: "var(--color-text-secondary)" }}>{a}</li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "620px",
    margin: "40px auto",
    padding: "1.5rem",
    fontFamily: "var(--font-sans, system-ui, sans-serif)",
  },
  title: {
    fontSize: "22px",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "1.5rem",
    color: "var(--color-text-primary)",
  },
  card: {
    background: "var(--color-background-primary)",
    border: "0.5px solid var(--color-border-tertiary)",
    borderRadius: "12px",
    padding: "1.25rem",
    marginBottom: "1rem",
  },
  fieldLabel: {
    fontSize: "13px",
    color: "var(--color-text-secondary)",
    margin: "0 0 6px",
  },
  input: {
    flex: 1,
    width: "100%",
    padding: "10px 14px",
    fontSize: "15px",
    borderRadius: "8px",
    border: "0.5px solid var(--color-border-secondary)",
    background: "var(--color-background-secondary)",
    color: "var(--color-text-primary)",
    fontFamily: "var(--font-mono, monospace)",
    boxSizing: "border-box" as const,
  },
  iconButton: {
    padding: "10px",
    borderRadius: "8px",
    border: "0.5px solid var(--color-border-secondary)",
    background: "transparent",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    color: "var(--color-text-secondary)",
    flexShrink: 0,
  },
  barBg: {
    width: "100%",
    height: "6px",
    background: "var(--color-background-secondary)",
    borderRadius: "99px",
    overflow: "hidden",
    margin: "12px 0 10px",
  },
  barFill: {
    height: "6px",
    borderRadius: "99px",
    transition: "width 0.3s",
  },
  sectionTitle: {
    fontSize: "13px",
    fontWeight: 500,
    color: "var(--color-text-secondary)",
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
    margin: "0 0 10px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    fontSize: "13px",
    padding: "7px 0",
    borderBottom: "0.5px solid var(--color-border-tertiary)",
    lineHeight: "1.5",
  },
};
