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
  const categories = formData.get("categories");
  const images = formData.getAll("images");

  try {
    let createPost;
    categories.forEach(async (categorie) => {
      createPost = await prisma.post.create({
        data: {
          title,
          desc,
          budget,
          slug: slugify(title, { lower: true, replacement: "-" }),
          officeHours,
          latitude,
          longitude,
          address,
          city,
          categorie,
          userId,
        },
      });
    });
  } catch (error) {
    console.log(error);
    return res.json({ error: `Something went wrong. Please try again later, ${error}` }, { status: 500 });
  }
}
