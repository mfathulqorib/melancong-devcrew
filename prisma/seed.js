const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const CreateRole = async () => {
  try {
    const role = await prisma.role.createMany({
      data: [
        {
          id: process.env.ROLE_ID_USER,
          name: "user",
        },
        {
          id: process.env.ROLE_ID_ADMIN,
          name: "admin",
        },
      ],
    });

    console.log("seed succes: ", role);
  } catch (error) {
    console.log(error);
  }
};

CreateRole();
