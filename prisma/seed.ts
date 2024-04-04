require("dotenv").config({ path: ".env.local" });

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.role.upsert({
    update: {},
    create: {
      name: "Admin",
      code: "admin",
      actions: {
        create: [
          {
            name: "User show",
            code: "user.show",
          },
          {
            name: "User create",
            code: "user.create",
          },
          {
            name: "User edit",
            code: "user.edit",
          },
          {
            name: "User delete",
            code: "user.delete",
          },
        ],
      },
    },
    where: {
      code: "admin",
    },
  });

  await prisma.role.upsert({
    update: {},
    create: {
      name: "User",
      code: "user",
    },
    where: {
      code: "user",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
