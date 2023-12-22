import { NextResponse as res } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/utils/prisma";
import crypto from "crypto";

export async function POST(req) {
  const { username, name, email, password, roleId, bio, avatar } =
    await req.json();

  const token = crypto.randomBytes(16).toString("hex");
  console.log("token", token);

  // try {
  //   // Create hashed password
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   // Create user to database
  //   const createUser = await prisma.user.create({
  //     data: {
  //       username,
  //       name,
  //       email,
  //       roleId,
  //       bio,
  //       avatar,
  //       password: hashedPassword,
  //     },
  //   });

  //   return res.json(
  //     { data: createUser, message: "User created successfully" },
  //     { status: 201 }
  //   );
  // } catch (error) {
  //   console.log(error);
  //   return res.json(
  //     { errorMessage: "Something went wrong. Please try again later" },
  //     { status: 500 }
  //   );
  // }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return Response.json({ data: users, message: "success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return res.json(
      { errorMessage: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }
}
