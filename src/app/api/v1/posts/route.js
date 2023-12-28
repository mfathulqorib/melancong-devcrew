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
      const isUser = await prisma.user.findUnique({ where: { id: userId } });

      if (!isUser) {
        return res.json({ error: "user not found" }, { status: 401 });
      }
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
        categories.forEach(async (categoryId) => {
          const checkCategory = await prisma.category.findUnique({
            where: {
              id: categoryId,
            },
          });
          if (!checkCategory) {
            return res.json({ error: `${checkCategory}, category not found` }, { status: 404 });
          }

          const postCategory = await prisma.postCategory.create({
            data: { postId, categoryId },
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

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";
  const postId = searchParams.get("id");

  // Calculate the start and end indexes for the requested page
  const startIndex = (page - 1) * limit || 0;
  const endIndex = page * limit;

  const querySearch = {
    OR: [
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        desc: {
          contains: search,
          mode: "insensitive",
        },
      },
    ],
  };

  const includeQuery = {
    user: {
      select: {
        name: true,
      },
    },
    postImage: {
      select: {
        name: true,
      },
    },
    postCategory: {
      select: {
        id: true,
        category: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    },
  };

  try {
    // find Detail
    if (postId) {
      const detailPost = await prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: includeQuery,
      });

      if (!detailPost) {
        return res.json({ error: `data ${slug} not found` }, { status: 404 });
      } else {
        return res.json({ data: detailPost }, { status: 200 });
      }
    }

    // find many
    const [data, total] = await prisma.$transaction([
      prisma.post.findMany({
        where: querySearch,
        include: includeQuery,
        skip: startIndex,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.post.count({ where: querySearch }),
    ]);

    const totalPage = Math.ceil(total / limit);
    const paginate = {
      page,
      limit,
      total,
      totalPage,
    };
    return res.json({ data, paginate }, { status: 200 });
  } catch (error) {
    console.log(error);
    return res.json({ error: `Something went wrong. Please try again later, ${error}` }, { status: 500 });
  }
}

export async function PATCH(req) {
  const searchParams = req.nextUrl.searchParams;
  const postId = searchParams.get("id") || "";

  //  detail user Login
  const cookieStorage = cookies();
  const token = cookieStorage.get("token")?.value;
  const user = verify(token, process.env.JWT_SECRET);

  console.log("role", user);

  try {
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

    console.log("post id", postId);
    const postDetail = await prisma.post.findUnique({ where: { id: postId } });

    console.log({ postDetail });

    if (user.roleId != process.envROLE_ID_ADMIN && user.roleId != postDetail.userId) {
      return res.json({ error: "sorry you didnt get permisio for this feature" }, { status: 400 });
    }

    if (condition) {
    }
    // const updatePost = await prisma.post.update({
    //   where: {
    //     slug,
    //   },
    //   data: {
    //     title,
    //     desc,
    //     budget: Number(budget) || 0,
    //     slug: slugify(title, { lower: true, replacement: "-" }),
    //     officeHours,
    //     latitude,
    //     longitude,
    //     address,
    //     city,
    //   },
    // });
  } catch (error) {
    console.log(error);
    return res.json({ error: `Something went wrong. Please try again later, ${error}` }, { status: 500 });
  }
}
