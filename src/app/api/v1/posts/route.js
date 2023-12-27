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
  const categories = formData.get("categories");
  const images = formData.getAll("images");
  console.log("images", images);

  //   get detail user
  const cookieStorage = cookies();
  const token = cookieStorage.get("token")?.value;
  const decoded = verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  try {
    // const createPost = await prisma.post.create({
    //   data: {
    //     title,
    //     desc,
    //     budget: Number(budget) || 0,
    //     slug: slugify(slug, { lower: true, replacement: "-" }),
    //     officeHours,
    //     latitude,
    //     longitude,
    //     address,
    //     city,
    //   },
    // });
    // make relation post_category
    // categories.forEach(async (category) => {
    //   const postCategory = await prisma.postCategory.create({
    //     postId: createPost.id,
    //     categoryId: category,
    //   });
    // });
    // make relation post_image
  } catch (error) {
    console.log(error);
    return res.json({ error: `Something went wrong. Please try again later, ${error}` }, { status: 500 });
  }
}
