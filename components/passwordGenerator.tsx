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

  const generatePassword = () => {
    let chars = "";

    if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) chars += "0123456789";
    if (useSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) {
      alert("Select at least one character option (uppercase, lowercase, numbers, symbols).");
      return;
    }

    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }

    setPassword(result);
  };

  const copyToClipboard = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    alert("Copied to clipboard");
  };

  return (
    <div style={styles.container}>
      <h2>Password Generator</h2>

      {/* length */}
      <div>
        <input
          type="range"
          min="6"
          max="32"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
        <p>Length: {length}</p>
      </div>

      {/* CHECKBOXES */}
      <div style={styles.options}>
        <label>
          <input
            type="checkbox"
            checked={useUpper}
            onChange={() => setUseUpper(!useUpper)}
          />
          Uppercase (A-Z)
        </label>

        <label>
          <input
            type="checkbox"
            checked={useLower}
            onChange={() => setUseLower(!useLower)}
          />
          Lowercase (a-z)
        </label>

        <label>
          <input
            type="checkbox"
            checked={useNumbers}
            onChange={() => setUseNumbers(!useNumbers)}
          />
          Numbers (0-9)
        </label>

        <label>
          <input
            type="checkbox"
            checked={useSymbols}
            onChange={() => setUseSymbols(!useSymbols)}
          />
          Symbols (!@#$...)
        </label>
      </div>

      {/* Button */}
      <button onClick={generatePassword} style={styles.button}>
        Generate Password
      </button>

      {/* Output */}
      {password && (
        <div style={styles.resultBox}>
          <p style={styles.password}>{password}</p>

          <button onClick={copyToClipboard} style={styles.copyButton}>
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
}

/* ===================== */
/* sTYLES */
/* ===================== */

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    background: "#f3f3f3",
    borderRadius: "10px",
    fontFamily: "Arial",
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "10px",
  },
  button: {
    marginTop: "15px",
    padding: "10px",
    cursor: "pointer",
  },
  resultBox: {
    marginTop: "15px",
    padding: "10px",
    background: "#fff",
    borderRadius: "8px",
  },
  password: {
    fontFamily: "monospace",
    fontSize: "16px",
    wordBreak: "break-all",
  },
  copyButton: {
    marginTop: "10px",
    padding: "6px 10px",
    cursor: "pointer",
  },
};