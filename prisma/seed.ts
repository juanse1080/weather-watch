require('dotenv').config({ path: '.env.local' })

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.role.upsert({
    update: {},
    create: {
      name: 'Admin',
      code: 'admin',
      actions: {
        create: [
          {
            name: 'User read',
            code: 'user.read',
          },
          {
            name: 'User create',
            code: 'user.create',
          },
          {
            name: 'User update',
            code: 'user.update',
          },
          {
            name: 'User delete',
            code: 'user.delete',
          },
          {
            name: 'Role read',
            code: 'role.read',
          },
          {
            name: 'Role create',
            code: 'role.create',
          },
          {
            name: 'Role update',
            code: 'role.update',
          },
          {
            name: 'Role delete',
            code: 'role.delete',
          },
        ],
      },
    },
    where: {
      code: 'admin',
    },
  })

  await prisma.role.upsert({
    update: {},
    create: {
      name: 'User',
      code: 'user',
    },
    where: {
      code: 'user',
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
