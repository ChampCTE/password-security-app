// components/passwordGenerator.tsx
"use client";

import { useState } from "react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

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
    alert("Password copied to clipboard");
  };

  return (
    <div style={styles.container}>
      <h2>Password Generator</h2>

      {/* SLIDER */}
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

      {/* BOTÓN GENERAR */}
      <button onClick={generatePassword} style={styles.button}>
        Generate Password
      </button>

      {/* OUTPUT */}
      {password && (
        <div style={styles.resultBox}>
          <p style={styles.password}>{password}</p>

          <button onClick={copyToClipboard} style={styles.copyButton}>
            Copy
          </button>
        </div>
      )}
    </div>
  );
}

/* ===================== */
/* STYLES */
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
  button: {
    marginTop: "10px",
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