import { uploadFile } from "@/lib/uploadFile";
import prisma from "@/utils/prisma";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse as res } from "next/server";
import slugify from "slugify";

export async function POST(req) {
  const formData = await req.formData();
  const name = formData.get("name");
  const image = formData.get("image");

  //    get user id from token
  const cookieStore = cookies();

  const token = cookieStore.get("token")?.value;
  const decoded = verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  try {
    try {
      // save to db
      const createCategory = await prisma.category.create({
        data: {
          name,
          userId,
          slug: slugify(name, { lower: true, replacement: "-" }),
          image: image.name,
        },
      });
    } catch (error) {
      console.log(error);
      return res.json({ error: `Something went wrong. Please try again later, ${error}` }, { status: 500 });
    }

    // save image in aws
    try {
      const uploadCategoryImage = await uploadFile({
        Body: image,
        Dir: "categories",
      });
    } catch (error) {
      console.log(error);
      return res.json({ error: `s3 process failed. Please try again later, ${error}` }, { status: 500 });
    }

    return res.json({ message: "Success create category" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return res.json({ error: `Something went wrong. Please try again later, ${error}` }, { status: 500 });
  }
}
export async function GET() {
  try {
    const categories = await prisma.category.findMany();

    return res.json({ data: categories }, { status: 200 });
  } catch (error) {
    console.log(error);
    return res.json({ error: `Something went wrong. Please try again later, ${error}` }, { status: 500 });
  }
}
