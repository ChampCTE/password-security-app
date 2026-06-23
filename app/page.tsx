import PasswordAnalyzer from "@/components/passwordAnalyzer";
import PasswordGenerator from "@/components/passwordGenerator";

export default function Home() {
  return (
    <main style={{ padding: "40px" }}>
      <PasswordAnalyzer />
      <PasswordGenerator />
    </main>
  );
}