import { NextResponse } from "next/server";
import { ZxcvbnFactory } from "@zxcvbn-ts/core";
import { dictionary } from "@zxcvbn-ts/language-common";
import crypto from "crypto";

const zxcvbn = new ZxcvbnFactory({ dictionary });

// Check if the password has been pwned using the Have I Been Pwned API
async function checkHIBP(password: string) {
  const sha1 = crypto
    .createHash("sha1")
    .update(password)
    .digest("hex")
    .toUpperCase();

  const prefix = sha1.substring(0, 5);
  const suffix = sha1.substring(5);

  const response = await fetch(
    `https://api.pwnedpasswords.com/range/${prefix}`
  );

  if (!response.ok) {
    throw new Error("HIBP request failed");
  }

  const text = await response.text();

  const hashes = text.split("\n");

  for (const line of hashes) {
    const [hashSuffix, count] = line.trim().split(":");

    if (hashSuffix === suffix) {
      return {
        found: true,
        count: Number(count),
      };
    }
  }

  return {
    found: false,
    count: 0,
  };
}

// Analyze the password strength
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    const result = zxcvbn.check(password);

    const breach = await checkHIBP(password);

    return NextResponse.json({
      score: result.score,
      guesses: result.guesses,
      crackTime: result.crackTimes?.offlineSlowHashingXPerSecond?.display,

      pwned: breach.found,
      breachCount: breach.count,

    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}