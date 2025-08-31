import dbConfig from "@/middlewares/db.config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { school } = await req.json();
  const connection = await dbConfig();
  try {
    const query = `
      INSERT INTO schools (name, email_id, contact, address, city, state, image)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      school.name,
      school.email_id,
      school.contact,
      school.address,
      school.city,
      school.state,
      school.image,
    ];
    await connection!.query(query, values);
    return NextResponse.json(
      { message: "School added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding school: ", error);
    return NextResponse.json(
      { message: "Error adding school" },
      { status: 500 }
    );
  }
}
