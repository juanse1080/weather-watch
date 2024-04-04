import { PrismaClient } from '@prisma/client'

function initializePrisma() {
  if (process.env.NODE_ENV === 'production') {
    return new PrismaClient()
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient()
    }
    return global.prisma
  }
}

const prisma = initializePrisma()

export default prisma
