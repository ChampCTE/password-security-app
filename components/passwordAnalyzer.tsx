//components/passwordAnalyzer.tsx
//password strength analyzer component
"use client";

import { useMemo, useState } from "react";
import zxcvbn from "zxcvbn-ts";

export default function PasswordAnalyzer() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const result = useMemo(() => zxcvbn(password), [password]);

  const strengthLabel = (score: number) => {
    switch (score) {
      case 0:
      case 1:
        return "Weak";
      case 2:
        return "Medium";
      case 3:
        return "Strong";
      case 4:
        return "Excellent";
      default:
        return "";
    }
  };

  const strengthColor = (score: number) => {
    switch (score) {
      case 0:
      case 1:
        return "#ef4444";
      case 2:
        return "#f59e0b";
      case 3:
        return "#3b82f6";
      case 4:
        return "#22c55e";
      default:
        return "#ccc";
    }
  };

  const score = result.score;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Password Security Analyzer</h1>

      {/* INPUT */}
      <div style={styles.card}>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Write your password here..."
          style={styles.input}
        />

        <button onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {/* RESULTADOS */}
      {password && (
        <div style={styles.card}>
          <p>
            Level: <strong>{strengthLabel(score)}</strong>
          </p>

          {/* BARRA */}
          <div style={styles.barBg}>
            <div
              style={{
                ...styles.barFill,
                width: `${(score / 4) * 100}%`,
                backgroundColor: strengthColor(score),
              }}
            />
          </div>

          <p>Score: {score}/4</p>

          <p>
            ⏱ Crack Time:{" "}
            {result.crack_times_display?.offline_slow_hashing_1e5_per_second}
          </p>

          <p>
            🧠 Estimated Guesses: {result.guesses?.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}

/* ===================== */
/* ESTILOS */
/* ===================== */

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    fontFamily: "Arial",
    padding: "20px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  card: {
    background: "#f3f3f3",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "15px",
  },
  input: {
    width: "80%",
    padding: "10px",
    marginRight: "10px",
  },
  barBg: {
    width: "100%",
    height: "10px",
    background: "#ddd",
    borderRadius: "5px",
    marginTop: "10px",
  },
  barFill: {
    height: "10px",
    borderRadius: "5px",
    transition: "width 0.3s",
  },
};