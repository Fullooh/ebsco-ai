// src/app/api/leads/route.js
import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const filePath = path.join("/tmp/uploads", "data.json");

  try {
    const data = await fs.readFile(filePath, "utf8");

    if (!data.trim()) {
      return NextResponse.json([]); // Empty array if no data
    }

    const leads = JSON.parse(data);
    return NextResponse.json(leads); 
  } catch (error) {
    console.error("Error loading or parsing data.json:", error);
    return NextResponse.json(
      { error: "Failed to load data" },
      { status: 500 }
    );
  }
}
