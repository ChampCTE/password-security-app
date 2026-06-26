// services/passwordAnalyzer.ts
// Service for analyzing password strength

import { AnalyzePasswordRequest, AnalyzePasswordResponse, } from "@/types/password";

export async function analyzePasswordAPI(
  data: AnalyzePasswordRequest
): Promise<AnalyzePasswordResponse> {
  const res = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error analyzing password");
  }

  return res.json();
}