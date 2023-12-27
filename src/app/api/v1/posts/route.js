import { uploadFile } from "@/lib/uploadFile";
import prisma from "@/utils/prisma";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse as res } from "next/server";
import slugify from "slugify";

export async function POST(req) {
  const formData = await req.formData();
  const title = formData.get("title");
  const desc = formData.get("desc");
  const budget = formData.get("budget");
  const officeHours = formData.get("officeHours");
  const latitude = formData.get("latitude");
  const longitude = formData.get("longitude");
  const address = formData.get("address");
  const city = formData.get("city");
  const categories = formData.getAll("categories");
  const images = formData.getAll("images");

  //   get detail user
  const cookieStorage = cookies();
  const token = cookieStorage.get("token")?.value;
  const decoded = verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  console.log("categories", categories);

  let postId = "";
  try {
    try {
      const createPost = await prisma.post.create({
        data: {
          title,
          desc,
          budget: Number(budget) || 0,
          slug: slugify(title, { lower: true, replacement: "-" }),
          officeHours,
          latitude,
          longitude,
          address,
          city,
          userId,
        },
      });

      if (!createPost) {
        return res.json({ error: "failed create post" }, { status: 500 });
      }

      (postId = createPost.id),
        // make relation post_category
        categories.forEach(async (category) => {
          const checkCategory = await prisma.findUnique({
            where: {
              id: category,
            },
          });
          if (!checkCategory) {
            return res.json({ error: `${checkCategory}, category not found` }, { status: 404 });
          }

          const postCategory = await prisma.postCategory.create({
            data: { postId, categoryId: category },
          });
        });

      // make relation post_image
      images.forEach(async (element) => {
        const imageSave = await prisma.postImage.create({
          data: {
            postId,
            name: element.name,
          },
        });
      });
    } catch (error) {
      console.log(error);
      return res.json({ error: `Something went wrong. Please try again later, ${error}` }, { status: 500 });
    }

    // save to s3
    try {
      images.forEach(async (image) => {
        const UploadPostIMages = await uploadFile({
          Body: image,
          Dir: `posts/${postId}`,
        });
      });
    } catch (error) {
      console.log(error);
      return res.json({ error: `Something went wrong. Please try again later, ${error}` }, { status: 500 });
    }

    return res.json({ message: "success create post " }, { status: 200 });
  } catch (error) {
    console.log(error);
    return res.json({ error: `Something went wrong. Please try again later, ${error}` }, { status: 500 });
  }
}
