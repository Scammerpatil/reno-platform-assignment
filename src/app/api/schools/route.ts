import dbConfig from "@/middlewares/db.config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const connection = await dbConfig();
    const [results] = await connection!.execute("SELECT * FROM schools");
    return NextResponse.json(results);
  } catch (error) {
    console.log("An Error Occured:", error);
    return NextResponse.json(
      { message: "Error fetching schools" },
      { status: 500 }
    );
  }
}
