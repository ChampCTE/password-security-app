// services/passwordGenerator.ts
// Service for generating passwords

import {  GeneratePasswordRequest,  GeneratePasswordResponse } from "@/types/password";

export async function generatePasswordAPI(
  data: GeneratePasswordRequest
): Promise<GeneratePasswordResponse> {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error generating password");
  }

  return res.json();
}