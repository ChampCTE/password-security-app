import { NextResponse } from "next/server";
import { ZxcvbnFactory } from "@zxcvbn-ts/core";
import { dictionary } from "@zxcvbn-ts/language-common";

const zxcvbn = new ZxcvbnFactory({ dictionary });

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

    return NextResponse.json({
      score: result.score,
      guesses: result.guesses,
      crackTime: result.crackTimes?.offlineSlowHashingXPerSecond?.display,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}