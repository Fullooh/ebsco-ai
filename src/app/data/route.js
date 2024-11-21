import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  // Adjust the file path to match your setup
  const filePath = path.join(process.cwd(), "public", "data.json");

  try {
    // Check if the file exists and is accessible
    await fs.access(filePath);

    // Read the file
    const data = await fs.readFile(filePath, "utf8");

    // Handle empty files
    if (!data.trim()) {
      console.warn("data.json is empty. Returning an empty array.");
      return NextResponse.json([]); // Return empty array if the file is empty
    }

    // Parse JSON data
    const leads = JSON.parse(data);
    return NextResponse.json(leads); // Return the leads data
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error("data.json not found. Returning an empty array.");
      return NextResponse.json([]); // Return an empty array if the file is missing
    }

    console.error("Error loading or parsing data.json:", error.message);
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}
