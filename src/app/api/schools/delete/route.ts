import dbConfig from "@/middlewares/db.config";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  try {
    if (!id) {
      return NextResponse.json({ error: "Missing school ID" }, { status: 400 });
    }
    const connection = await dbConfig();
    await connection!.query("DELETE FROM schools WHERE id = ?", [id]);
    return NextResponse.json(
      { message: "School deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("An Error Occured:", error);
    return NextResponse.json(
      { error: "Failed to delete school" },
      { status: 500 }
    );
  }
}
