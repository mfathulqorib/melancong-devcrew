import { cookies } from "next/headers";
import { NextResponse as res } from "next/server";

export async function POST() {
  cookies().delete("token");
  return res.json({ message: "Logout succesfully" }, { status: 200 });
}
