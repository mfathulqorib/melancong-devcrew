const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const CreateRole = async () => {
  try {
    const role = await prisma.role.create({
      data: {
        id: process.env.ROLE_ID_USER,
        name: "user",
      },
    });
    console.log("seed succes: ", role);
  } catch (error) {
    console.log(error);
  }
};

CreateRole();
