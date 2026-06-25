// components/passwordGenerator.tsx
"use client";

import { useState } from "react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  const getRandomChar = (str: string) => str[Math.floor(Math.random() * str.length)];

  const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const generatePassword = () => {
    let available = "";
    let mandatory: string[] = [];
    if (useUpper) { available += upper; mandatory.push(getRandomChar(upper)); }
    if (useLower) { available += lower; mandatory.push(getRandomChar(lower)); }
    if (useNumbers) { available += numbers; mandatory.push(getRandomChar(numbers)); }
    if (useSymbols) { available += symbols; mandatory.push(getRandomChar(symbols)); }
    if (!available) {
      alert("Select at least one character option.");
      return;
    }
    let result: string[] = [...mandatory];
    for (let i = result.length; i < length; i++) result.push(getRandomChar(available));
    setPassword(shuffle(result).join(""));
    setCopied(false);
  };

  const copyToClipboard = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const options = [
    { label: "Uppercase", state: useUpper, toggle: () => setUseUpper(!useUpper) },
    { label: "Lowercase", state: useLower, toggle: () => setUseLower(!useLower) },
    { label: "Numbers",   state: useNumbers, toggle: () => setUseNumbers(!useNumbers) },
    { label: "Symbols",   state: useSymbols, toggle: () => setUseSymbols(!useSymbols) },
  ];

  return (
    <div style={styles.container}>

      <h2 style={styles.title}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style={{ width: "22px", height: "22px", color: "#2563EB" }} aria-hidden="true">
          <path fill="currentColor" d="M256 160L256 224L384 224L384 160C384 124.7 355.3 96 320 96C284.7 96 256 124.7 256 160zM192 224L192 160C192 89.3 249.3 32 320 32C390.7 32 448 89.3 448 160L448 224C483.3 224 512 252.7 512 288L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 288C128 252.7 156.7 224 192 224z"/>
        </svg>
        Password Generator
      </h2>

      <div style={styles.card}>

        {/* LENGTH SLIDER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <p style={styles.fieldLabel}>Length</p>
          <span style={{ fontSize: "18px", fontWeight: 600, color: "#2563EB" }}>{length}</span>
        </div>
        <input
          type="range" min="6" max="32" value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          style={{ width: "100%", accentColor: "#2563EB" }}
        />

        {/* OPTIONS */}
        <div style={styles.optionsGrid}>
          {options.map(({ label, state, toggle }) => (
            <button
              key={label}
              onClick={toggle}
              style={{
                ...styles.optionCard,
                border: state ? "1.5px solid #2563EB" : "1px solid #E2E8F0",
                background: state ? "#EFF6FF" : "#FFFFFF",
                color: state ? "#1D4ED8" : "#64748B",
                fontWeight: state ? 600 : 400,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* GENERATE BUTTON */}
        <button onClick={generatePassword} style={styles.generateButton}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style={{ width: "16px", height: "16px" }} aria-hidden="true">
            <path fill="currentColor" d="M509.3 106.7C516.9 114.3 516.9 126.7 509.3 134.3L390.7 253.3C383.1 260.9 370.7 260.9 363.1 253.3C355.5 245.7 355.5 233.3 363.1 225.7L460.7 128L96 128C85.0 128 75.5 120.8 72.8 110.2C70.1 99.6 74.8 88.5 84.3 83.3L84.3 83.3C84.3 83.3 84.3 83.3 84.3 83.3L96 96L480 96L480 96C490.9 96 500.4 103.2 503.1 113.8C503.8 116.5 504 119.3 503.7 122L509.3 106.7zM130.7 533.3C123.1 525.7 123.1 513.3 130.7 505.7L249.3 386.7C256.9 379.1 269.3 379.1 276.9 386.7C284.5 394.3 284.5 406.7 276.9 414.3L179.3 512L544 512C554.9 512 564.5 519.2 567.2 529.8C569.9 540.4 565.2 551.5 555.7 556.7L544 544L160 544C149.1 544 139.5 536.8 136.8 526.2C136.1 523.5 135.9 520.7 136.3 518L130.7 533.3z"/>
          </svg>
          Generate Password
        </button>
      </div>

      {/* OUTPUT */}
      {password && (
        <div style={styles.card}>
          <p style={styles.fieldLabel}>Generated password</p>
          <p style={styles.password}>{password}</p>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={copyToClipboard} style={{
              ...styles.copyButton,
              background: copied ? "#EFF6FF" : "#FFFFFF",
              color: copied ? "#1D4ED8" : "#2563EB",
              border: copied ? "1.5px solid #2563EB" : "1px solid #CBD5E1",
            }}>
              {copied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style={{ width: "14px", height: "14px" }} aria-hidden="true">
                    <path fill="currentColor" d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/>
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style={{ width: "14px", height: "14px" }} aria-hidden="true">
                    <path fill="currentColor" d="M448 96L439.4 96C428.4 76.9 407.7 64 384 64L256 64C232.3 64 211.6 76.9 200.6 96L192 96C156.7 96 128 124.7 128 160L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 160C512 124.7 483.3 96 448 96zM264 176C250.7 176 240 165.3 240 152C240 138.7 250.7 128 264 128L376 128C389.3 128 400 138.7 400 152C400 165.3 389.3 176 376 176L264 176z"/>
                  </svg>
                  Copy to Clipboard
                </>
              )}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "620px",
    margin: "0 auto",
    padding: "1.5rem",
    fontFamily: "system-ui, sans-serif",
  },
  title: {
    fontSize: "20px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "1.25rem",
    color: "#1E293B",
  },
  card: {
    background: "#F8FAFC",
    border: "1px solid #E2E8F0",
    borderRadius: "12px",
    padding: "1.1rem 1.25rem",
    marginBottom: "0.875rem",
  },
  fieldLabel: {
    fontSize: "11px",
    fontWeight: 600,
    color: "#94A3B8",
    margin: "0 0 6px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.07em",
  },
  optionsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
    margin: "1rem 0",
  },
  optionCard: {
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    textAlign: "center" as const,
    transition: "all 0.15s ease",
  },
  generateButton: {
    width: "100%",
    padding: "11px",
    background: "#2563EB",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "4px",
  },
  password: {
    fontFamily: "monospace",
    fontSize: "16px",
    letterSpacing: "0.04em",
    wordBreak: "break-all" as const,
    margin: "4px 0 12px",
    color: "#1E293B",
  },
  copyButton: {
    padding: "7px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.15s ease",
  },
};