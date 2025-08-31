import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req: NextRequest) {
  try {
    const request = await req.formData();
    const file = request.get("file");
    let name = request.get("name") as string;
    name = name.split(" ").join("_");
    const folderName = request.get("folderName");

    const blob = file as Blob;
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = blob.type || "application/octet-stream";
    const base64 = buffer.toString("base64");
    const dataUri = `data:${mimeType};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      public_id: name,
    });

    const fileUrl = result.secure_url;
    console.log(fileUrl);
    return NextResponse.json({ fileUrl: fileUrl }, { status: 200 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Unknown error occurred during upload." },
      { status: 500 }
    );
  }
}
