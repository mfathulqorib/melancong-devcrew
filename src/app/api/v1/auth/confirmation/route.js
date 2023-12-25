import prisma from "@/utils/prisma";
import { NextResponse as res } from "next/server";

export async function PATCH(req) {
  const searchParams = req.nextUrl.searchParams;
  const user = searchParams.get("user");
  const token = searchParams.get("token");

  try {
    console.log({ token });
    console.log({ user });
    const gettoken = await prisma.tokenEmail.findMany();

    const findUser = await prisma.tokenEmail.findUnique({
      where: {
        token,
        userId: user,
      },
    });

    return res.json({ data: findUser, alltoken: gettoken });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something went wrong. Please try again later", error }, { status: 500 });
  }
}
