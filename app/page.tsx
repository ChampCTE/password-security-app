//app/page.tsx
import PasswordAnalyzer from "@/components/passwordAnalyzer";
import PasswordGenerator from "@/components/passwordGenerator";
 
export default function Home() {
  return (
    <>
      <main style={{
        minHeight: "100vh",
        background: "#FFFFFF",
        padding: "48px 24px 32px",
      }}>
 
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#1E293B",
            margin: "0 0 8px",
            fontFamily: "system-ui, sans-serif",
          }}>
            Password Security Tool
          </h1>
          <p style={{
            fontSize: "15px",
            color: "#64748B",
            margin: 0,
            fontFamily: "system-ui, sans-serif",
          }}>
            Analyze the strength of your passwords and generate secure ones!
          </p>
        </div>
 
        {/* DIVIDER */}
        <PasswordAnalyzer />
        <div style={{
          maxWidth: "620px",
          margin: "0 auto 0.5rem",
          borderTop: "1px solid #E2E8F0",
        }} />

        <PasswordGenerator />
      </main>
 
      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid #E2E8F0",
        padding: "20px 24px",
        textAlign: "center",
        background: "#F8FAFC",
        fontFamily: "system-ui, sans-serif",
      }}>
        <p style={{ margin: 0, fontSize: "13px", color: "#94A3B8" }}>
          Built by{" "}
          <a
            href="https://github.com/ChampCTE"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#2563EB", textDecoration: "none", fontWeight: 500 }}
          >
            Cèlia Trullà
          </a>
          {" · "}
          <a
            href="https://github.com/ChampCTE/password-security-app"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#2563EB", textDecoration: "none", fontWeight: 500 }}
          >
            View source
          </a>
          {" · "}
          {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}