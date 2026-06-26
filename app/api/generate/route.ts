// app/api/generate/routes.ts
// API route for generating passwords

import { NextResponse } from "next/server";

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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      length = 12,
      useUpper = true,
      useLower = true,
      useNumbers = true,
      useSymbols = false,
    } = body;

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
      return NextResponse.json(
        { error: "No character sets selected" },
        { status: 400 }
      );
    }

    let result: string[] = [...mandatory];

    for (let i = result.length; i < length; i++) {
      result.push(getRandomChar(available));
    }

    result = shuffle(result);

    return NextResponse.json({
      password: result.join(""),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}