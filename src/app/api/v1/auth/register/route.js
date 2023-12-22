import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/utils/prisma";

export async function POST(req) {
  const { username, name, email, password, roleId, bio, avatar } =
    await req.json();

  try {
    // Create hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user to database
    const createUser = await prisma.user.create({
      data: {
        username,
        name,
        email,
        roleId,
        bio,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { data: createUser, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { errorMessage: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }
}
