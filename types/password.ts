// types/password.ts
// Type definitions for password generator and analyzer

export type GeneratePasswordRequest = {
  length: number;
  useUpper: boolean;
  useLower: boolean;
  useNumbers: boolean;
  useSymbols: boolean;
};

export type GeneratePasswordResponse = {
  password: string;
};

export type AnalyzePasswordRequest = {
  password: string;
};

export type AnalyzePasswordResponse = {
  score: number;
  guesses: number;
  crackTime?: string;
};