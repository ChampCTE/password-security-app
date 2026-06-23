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

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  const getRandomChar = (str: string) =>
    str[Math.floor(Math.random() * str.length)];

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

    if (useUpper) {
      available += upper;
      mandatory.push(getRandomChar(upper));
    }
    if (useLower) {
      available += lower;
      mandatory.push(getRandomChar(lower));
    }
    if (useNumbers) {
      available += numbers;
      mandatory.push(getRandomChar(numbers));
    }
    if (useSymbols) {
      available += symbols;
      mandatory.push(getRandomChar(symbols));
    }

    if (!available) {
      alert("Select at least one character option (uppercase, lowercase, numbers, symbols).");
      return;
    }

    let result: string[] = [...mandatory];

    for (let i = result.length; i < length; i++) {
      result.push(getRandomChar(available));
    }

    result = shuffle(result);

    setPassword(result.join(""));
  };

  const copyToClipboard = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          style={{ width: "1.4em", height: "1.4em", marginRight: "0.5em" }}
          aria-hidden="true"
        >
          <path d="M256 160L256 224L384 224L384 160C384 124.7 355.3 96 320 96C284.7 96 256 124.7 256 160zM192 224L192 160C192 89.3 249.3 32 320 32C390.7 32 448 89.3 448 160L448 224C483.3 224 512 252.7 512 288L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 288C128 252.7 156.7 224 192 224z"/>
        </svg>
        Password Generator (Pro)
      </h2>

      {/* Length */}
      <input
        type="range"
        min="6"
        max="32"
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
      />
      <p>Length: {length}</p>

      {/* Options */}
      <div style={styles.options}>
        <label>
          <input
            type="checkbox"
            checked={useUpper}
            onChange={() => setUseUpper(!useUpper)}
          />
          Uppercase
        </label>

        <label>
          <input
            type="checkbox"
            checked={useLower}
            onChange={() => setUseLower(!useLower)}
          />
          Lowercase
        </label>

        <label>
          <input
            type="checkbox"
            checked={useNumbers}
            onChange={() => setUseNumbers(!useNumbers)}
          />
          Numbers
        </label>

        <label>
          <input
            type="checkbox"
            checked={useSymbols}
            onChange={() => setUseSymbols(!useSymbols)}
          />
          Symbols
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              style={{ width: "1em", height: "1em", marginRight: "0.4em" }}
              aria-hidden="true"
            >
              <path d="M448 96L439.4 96C428.4 76.9 407.7 64 384 64L256 64C232.3 64 211.6 76.9 200.6 96L192 96C156.7 96 128 124.7 128 160L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 160C512 124.7 483.3 96 448 96zM264 176C250.7 176 240 165.3 240 152C240 138.7 250.7 128 264 128L376 128C389.3 128 400 138.7 400 152C400 165.3 389.3 176 376 176L264 176z"/>
            </svg>
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
}

/* Styles */

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
  heading: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    margin: 0,
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
    display: "inline-flex",
    alignItems: "center",
  },
};