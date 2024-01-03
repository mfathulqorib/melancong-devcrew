import prisma from "@/utils/prisma";
import { NextResponse as res } from "next/server";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    if (!email && !password) {
      return res.json(
        { error: "email and password is required" },
        { status: 400 },
      );
    }

    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!findUser) {
      return res.json({ error: "User not found" }, { status: 404 });
    }

    if (!findUser.isVerified) {
      return res.json(
        { error: "Please verify your account first" },
        { status: 401 },
      );
    }

    // Bandingkan password yang diinput dengan password di database
    const comparePassword = await bcrypt.compare(password, findUser.password);

    // Jika password tidak cocok, kirim pesan error
    if (!comparePassword) {
      return res.json({ error: "Invalid Password" }, { status: 401 });
    }

    // Jika password cocok, kirim data user
    const payload = {
      id: findUser.id,
      username: findUser.username,
      name: findUser.name,
      bio: findUser.bio,
      email: findUser.email,
      avatar: findUser.avatar,
      roleId: findUser.roleId,
    };

    // Buat token
    const token = sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
    const cookieResponse = res.json(
      { data: payload, message: "Login succesfully" },
      { status: 200 },
    );
    cookieResponse.cookies.set("token", token);

    return cookieResponse;
  } catch (error) {
    console.log(error);
    return res.json(
      { error: "Something went wrong. Please try again later" },
      { status: 500 },
    );
  }
}
