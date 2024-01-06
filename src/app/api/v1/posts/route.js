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

      postId = createPost.id;
      // make relation post_category
      for (const categoryId of categories) {
        const checkCategory = await prisma.category.findUnique({
          where: {
            id: categoryId,
          },
        });

        if (!checkCategory) {
          return res.json(
            { error: `${categoryId}, category not found` },
            { status: 404 },
          );
        }

        const postCategory = await prisma.postCategory.create({
          data: { postId, categoryId },
        });
      }

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
      return res.json(
        { error: `Something went wrong. Please try again later, ${error}` },
        { status: 500 },
      );
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
      return res.json(
        { error: `Something went wrong. Please try again later, ${error}` },
        { status: 500 },
      );
    }

    return res.json({ message: "success create post " }, { status: 200 });
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
    rating: {
      select: {
        id: true,
        rate: true,
        user: {
          select: {
            name: true,
            id: true,
          },
        },
        createdAt: true,
      },
    },
    comment: {
      select: {
        id: true,
        message: true,
        user: {
          select: {
            name: true,
            id: true,
          },
        },
        createdAt: true,
      },
    },
  };

  try {
    // Detail Post
    if (postId) {
      const detailPost = await prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: includeQuery,
      });
      const averageRating =
        await prisma.$queryRaw`SELECT "postId", AVG("rate") as "averageRating" FROM "Rating" WHERE "postId" = ${postId} GROUP BY "postId"`;
      detailPost["averageRating"] =
        averageRating.length !== 0 ? averageRating[0].averageRating : 0;

      if (!detailPost) {
        return res.json({ error: `data ${postId} not found` }, { status: 404 });
      } else {
        return res.json({ data: detailPost }, { status: 200 });
      }
    }

    // find many
    const [data, total, averageRatings] = await prisma.$transaction([
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
      prisma.$queryRaw`SELECT "postId", AVG("rate") as "averageRating" FROM "Rating" GROUP BY "postId"`,
    ]);
    const averageRatingsMap = averageRatings.reduce((acc, rating) => {
      acc[rating.postId] = rating.averageRating;
      return acc;
    }, {});

    const totalPage = Math.ceil(total / limit);

    const response = {
      data: data.map((post) => ({
        ...post,
        averageRating: averageRatingsMap[post.id] || 0,
      })),
      paginate: {
        page,
        limit,
        total,
        totalPage,
      },
    };
    return res.json(response, { status: 200 });
  } catch (error) {
    console.log(error);
    return res.json(
      { error: `Something went wrong. Please try again later, ${error}` },
      { status: 500 },
    );
  }
}

export async function PATCH(req) {
  const searchParams = req.nextUrl.searchParams;
  const postId = searchParams.get("id") || "";
  //  detail user Login
  const cookieStorage = cookies();
  const token = cookieStorage.get("token")?.value;
  const user = verify(token, process.env.JWT_SECRET);
  // get request from formData
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

  try {
    try {
      const postDetail = await prisma.post.findUnique({
        where: { id: postId },
      });
      if (!postDetail) {
        return res.json({ error: "post  not found" }, { status: 404 });
      }

      const isUser = await prisma.user.findUnique({ where: { id: user.id } });
      if (!isUser) {
        return res.json({ error: "user not found" }, { status: 401 });
      }

      if (
        user.roleId != process.env.ROLE_ID_ADMIN &&
        user.id != postDetail.userId
      ) {
        return res.json(
          { error: "sorry you didnt get permision access for this feature" },
          { status: 400 },
        );
      }

      console.log({ categories });

      let dataPostCategories = [];
      for (const category in categories) {
        const idPost = postId;
        const entry = { postId: idPost, categoryId: categories[category] };
        dataPostCategories.push(entry);
      }

      // create postImage
      let dataPostImage = [];
      for (const image in images) {
        const idPost = postId;
        const entry = { postId: idPost, name: images[image].name };
        dataPostImage.push(entry);
      }

      console.log({ dataPostCategories });

      const [
        updatePost,
        deletePostCategories,
        createPostCategory,
        deleteImage,
        createPostImage,
      ] = await prisma.$transaction([
        prisma.post.update({
          where: {
            id: postId,
          },
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
          },
        }),

        prisma.postCategory.deleteMany({ where: { postId: postId } }),
        prisma.postCategory.createMany({ data: dataPostCategories }),
        prisma.postImage.deleteMany({ where: { postId: postId } }),
        prisma.postImage.createMany({ data: dataPostImage }),
      ]);

      res.json(
        {
          message: "succes update data",
          updatePost,
          deletePostCategories,
          createPostCategory,
          deleteImage,
          createPostImage,
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
      return res.json(
        { error: `Something went wrong. Please try again later, ${error}` },
        { status: 500 },
      );
    }
    return res.json(
      {
        message: "succes update data",
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

export async function DELETE(req) {
  const searchParams = req.nextUrl.searchParams;
  const postId = searchParams.get("id") || "";
  //  detail user Login
  const cookieStorage = cookies();
  const token = cookieStorage.get("token")?.value;
  const user = verify(token, process.env.JWT_SECRET);
  try {
    const postDetail = await prisma.post.findUnique({ where: { id: postId } });
    if (!postDetail) {
      return res.json({ error: "post  not found" }, { status: 404 });
    }

    const isUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (!isUser) {
      return res.json({ error: "user not found" }, { status: 401 });
    }

    if (
      user.roleId != process.env.ROLE_ID_ADMIN &&
      user.id != postDetail.userId
    ) {
      return res.json(
        { error: "sorry you didnt get permision access for this feature" },
        { status: 400 },
      );
    }

    const deletePost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return res.json({ message: "delete post success" });
  } catch (error) {
    console.log(error);
    return res.json(
      { error: `Something went wrong. Please try again later, ${error}` },
      { status: 500 },
    );
  }
}
