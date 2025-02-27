import { PrismaClient } from '@prisma/client'
import { logger } from '../src/utils/logger'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      username: 'dineshranaut',
      name: 'dinesh ranaut',
      email: 'dinneshranaut@prisma.io',
      passwordHash: 'gyut876aw87b',
    },
  })

  const profile = await prisma.account.create({
    data: {
      bio: 'solo traveller',
      avatar: 'https://www.google.com',
      user: {
        connect: { id: user.id },
      },
    }
  })


  logger.info(user)
  console.log(profile)
}

main()