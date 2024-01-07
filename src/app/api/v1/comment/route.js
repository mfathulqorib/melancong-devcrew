import prisma from "@/utils/prisma";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse as res } from "next/server";

export async function POST(req) {
  //  detail user Login
  const cookieStorage = cookies();
  const token = cookieStorage.get("token")?.value;
  const user = verify(token, process.env.JWT_SECRET);
  // get data from json
  const { postId, message } = await req.json();

  try {
    const postDetail = await prisma.post.findUnique({ where: { id: postId } });
    if (!postDetail) {
      return res.json({ error: "post  not found" }, { status: 404 });
    }

    const comment = await prisma.comment.create({
      data: {
        postId,
        message,
        userId: user.id,
      },
    });
    return res.json({ message: "success give comment" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return res.json(
      { error: `Something went wrong. Please try again later, ${error}` },
      { status: 500 },
    );
  }
}

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  try {
    const query = {
      post: {
        select: {
          title: true,
          rating: true,
        },
      },
    };

    const detailComment = await prisma.comment.findMany({
      where: {
        userId: userId,
      },
      include: query,
    });
    return res.json({ data: detailComment }, { status: 200 });
  } catch (error) {
    console.log(error);
    return res.json(
      { error: `Something went wrong. Please try again later, ${error}` },
      { status: 500 },
    );
  }
}

export async function DELETE(req) {
  const cookieStorage = cookies();
  const token = cookieStorage.get("token")?.value;
  const user = verify(token, process.env.JWT_SECRET);
  // const commentId = req.params.commentId;
  const searchParams = req.nextUrl.searchParams;
  const commentId = searchParams.get("commentId");

  console.log(commentId);

  try {
    const existingComment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    // check if comment exist
    if (!existingComment) {
      return res.json({ error: `Comment not found` }, { status: 404 });
    }

    // check if the user is the owner
    if (existingComment.userId !== user.id) {
      return res.json({ error: `Cannot delete this comment` }, { status: 401 });
    }

    // delete comment
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    return res.json({ message: `Delete comment success` }, { status: 200 });
  } catch (error) {
    console.log(error);
    return res.json(
      { error: `Something went wrong. Please try again later, ${error}` },
      { status: 500 },
    );
  }
}
