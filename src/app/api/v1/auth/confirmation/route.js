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

    const findUserToken = await prisma.tokenEmail.findUnique({
      where: {
        token,
        userId: user,
      },
    });

    if (!findUserToken) {
      return res.json({ error: "Your verification link may have expired." }, { status: 400 });
    }

    const findUser = await prisma.user.findUnique({
      where: {
        id: user,
      },
    });

    if (!findUser) {
      return res.json(
        { error: "We were unable to find a user for this verification. Please SignUp!" },
        { status: 400 }
      );
    }

    if (findUser.isVerified) {
      return res.json({ error: "User has been already verified. Please Login" }, { status: 200 });
    }

    const updated = await prisma.user.update({
      where: {
        id: user,
      },
      data: {
        isVerified: true,
      },
    });

    return res.json({ message: "Your account has been successfully verified" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something went wrong. Please try again later", error }, { status: 500 });
  }
}
