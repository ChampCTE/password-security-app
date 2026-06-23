//components/passwordAnalyzer.tsx
//password strength analyzer component
"use client";

import { useState } from "react";
import zxcvbn from "zxcvbn-ts";

export default function PasswordAnalyzer() {
  const [password, setPassword] = useState("");

  const result = zxcvbn(password);

  const getStrengthLabel = (score: number) => {
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

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>Password Strength Analyzer</h2>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
        }}
      />

      {password && (
        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Strength:</strong> {getStrengthLabel(result.score)}
          </p>

          <p>
            <strong>Score:</strong> {result.score} / 4
          </p>

          <p>
            <strong>Crack Time:</strong>{" "}
            {result.crack_times_display?.offline_slow_hashing_1e5_per_second}
          </p>
        </div>
      )}
    </div>
  );
}