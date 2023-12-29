import prisma from "@/utils/prisma";
import { user } from "@nextui-org/react";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse as res } from "next/server";

export async function POST(req) {
  //  detail user Login
  const cookieStorage = cookies();
  const token = cookieStorage.get("token")?.value;
  const user = verify(token, process.env.JWT_SECRET);
  // get data from json
  const { postId, rate } = await req.json();

  try {
    const postDetail = await prisma.post.findUnique({ where: { id: postId } });
    if (!postDetail) {
      return res.json({ error: "post  not found" }, { status: 404 });
    }

    const rating = await prisma.rating.create({
      data: {
        postId,
        rate,
        userId: user.id,
      },
    });
    return res.json({ message: "success give rating" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return res.json(
      { error: `Something went wrong. Please try again later, ${error}` },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const users = await prisma.rating.findMany();
    const aggregations = await prisma.rating.aggregate({
      _avg: {
        rate: true,
      },
    });

    return res.json({ data: users, message: "success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return res.json(
      { errorMessage: "Something went wrong. Please try again later" },
      { status: 500 },
    );
  }
}
