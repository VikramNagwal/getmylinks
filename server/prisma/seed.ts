import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      username: 'thegreatkhali',
      name: 'milkha singh',
      email: 'singhmilkha@prisma.io',
      password: 'yetibiggint'
    },
  })

  const allUsers = await prisma.user.findFirst({
   where: {
        username: 'taxqueen'
   }
  })
  console.dir(allUsers)
  console.log(user)
}

main()