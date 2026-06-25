// app/api/analyze/routes.ts
// API route for analyzing password strength

import { NextResponse } from "next/server";
import zxcvbn from "zxcvbn-ts";

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

    const result = zxcvbn(password);

    return NextResponse.json({
      score: result.score,
      guesses: result.guesses,
      crackTime:
        result.crack_times_display
          ?.offline_slow_hashing_1e5_per_second,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}