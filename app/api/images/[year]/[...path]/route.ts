import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { year: string; path: string[] } }
) {
  try {
    const { year, path: imagePath } = params;

    // Construct the file path
    const filePath = path.join(process.cwd(), "posts", year, ...imagePath);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return new NextResponse("Image not found", { status: 404 });
    }

    // Read the file
    const fileBuffer = fs.readFileSync(filePath);

    // Determine content type based on file extension
    const ext = path.extname(filePath).toLowerCase();
    const contentTypeMap: Record<string, string> = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".webp": "image/webp",
      ".svg": "image/svg+xml",
    };

    const contentType = contentTypeMap[ext] || "application/octet-stream";

    // Return the image with proper headers
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
