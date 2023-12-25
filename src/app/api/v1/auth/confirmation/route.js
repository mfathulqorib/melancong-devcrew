import prisma from "@/utils/prisma";
import { NextResponse as res } from "next/server";

export async function PATCH(req) {
  const searchParams = req.nextUrl.searchParams;
  const user = searchParams.get("user");
  const token = searchParams.get("token");

  try {
    const findUser = await prisma.user.findUnique({
      where: {
        id: user,
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something went wrong. Please try again later", error }, { status: 500 });
  }
}
