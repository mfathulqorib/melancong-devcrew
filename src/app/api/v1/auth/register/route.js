import { EmailTheme } from "@/components/EmailTheme";
import prisma from "@/utils/prisma";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { NextResponse as res } from "next/server";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_KEY);

export async function POST(req) {
  const formData = await req.formData();
  const username = formData.get("username") || "";
  const name = formData.get("name") || "";
  const email = formData.get("email") || "";
  const password = formData.get("password") || "";
  const roleId = formData.get("roleId") || process.env.ROLE_ID_USER;
  const bio = formData.get("bio") || "";
  const isVerified = formData.get("isVerified") || false;
  const avatar = formData.get("avatar") || "";
  const token = crypto.randomBytes(16).toString("hex");
  const findUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  try {
    if (findUser) {
      return res.json({ error: "Email already registered" }, { status: 404 });
    }

    const data = {
      username,
      name,
      email,
      password: await bcrypt.hash(password, 10),
      roleId,
      bio,
      avatar,
      isVerified,
    };

    // ceate user data
    const createUser = await prisma.user.create({
      data: {
        username,
        name,
        email,
        password: await bcrypt.hash(password, 10),
        roleId,
        bio,
        avatar,
        isVerified,
      },
    });

    if (!createUser) {
      return res.json(
        { error: `failed create user, ${error}` },
        { status: 500 },
      );
    }
    // create token for verified email
    const createTokenEmail = await prisma.tokenEmail.create({
      data: {
        token,
        userId: createUser.id,
      },
    });

    if (!createTokenEmail) {
      return res.json(
        { error: `failed create Token verify user, ${error}` },
        { status: 500 },
      );
    }

    const mailData = {
      from: process.env.RESEND_EMAIL,
      to: [email],
      subject: "Verify your email for Melancong",
      react: EmailTheme({
        name,
        userId: createTokenEmail.userId,
        token: createTokenEmail.token,
      }),
    };

    const sendEmail = await resend.emails.send(mailData);
    if (sendEmail.error) {
      return res.json(
        { error: `failed sending email, ${sendEmail.error}` },
        { status: 500 },
      );
    }

    return res.json(
      {
        data: { createUser, createTokenEmail },
        message: "user create success",
      },
      { status: 200 },
    );
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
    const users = await prisma.user.findMany();
    return res.json({ data: users, message: "success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return res.json(
      { errorMessage: "Something went wrong. Please try again later" },
      { status: 500 },
    );
  }
}
