//i18n/index.ts
// Internationalization (i18n) module for managing translations

import { ca } from "@/locales/ca";
import { de } from "@/locales/de";
import { en } from "@/locales/en";
import { es } from "@/locales/es";
import { fr } from "@/locales/fr";
import { ja } from "@/locales/ja";
import { ko } from "@/locales/ko";
import { mk } from "@/locales/mk";
import { zhCN } from "@/locales/zh-CN";

const STORAGE_KEY = "password-security-app-language";

export type Language = "es" | "en" | "de" | "fr" | "ca" | "mk" | "ja" | "ko" | "zh-CN";

const translations: Record<Language, Record<string, string>> = {
  en: en as Record<string, string>,
  es: es as Record<string, string>,
  de: de as Record<string, string>,
  fr: fr as Record<string, string>,
  ca: ca as Record<string, string>,
  mk: mk as Record<string, string>,
  ja: ja as Record<string, string>,
  ko: ko as Record<string, string>,
  "zh-CN": zhCN as Record<string, string>,
};

function normalizeLanguage(language?: string | null): Language {
  if (!language) {
    return "en";
  }

  const normalized = language.toLowerCase();
  if (normalized in translations) {
    return normalized as Language;
  }

  const baseLanguage = normalized.split("-")[0];
  if (baseLanguage === "zh") {
    return "zh-CN";
  }

  if (baseLanguage in translations) {
    return baseLanguage as Language;
  }

  return "en";
}

export function getLanguage(): Language {
  if (typeof window === "undefined") {
    return "en";
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return normalizeLanguage(stored);
  }

  const browserLanguages = window.navigator.languages ?? [window.navigator.language];
  for (const browserLanguage of browserLanguages) {
    const matchedLanguage = normalizeLanguage(browserLanguage);
    if (matchedLanguage !== "en" || browserLanguage?.toLowerCase().startsWith("en")) {
      return matchedLanguage;
    }
  }

  return "en";
}

export function setLanguage(language: Language) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, language);
}

export function getText(language: string, key: string) {
  const normalizedLanguage = (language in translations ? language : "en") as Language;
  return translations[normalizedLanguage][key] ?? translations.en[key] ?? key;
}