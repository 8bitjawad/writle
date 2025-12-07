const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Testing database connection...')
  
  // Simple query to test connection
  const result = await prisma.$queryRaw`SELECT 1 as test`
  
  console.log('✅ Database connected successfully!')
  console.log('Result:', result)
}

main()
  .catch((e) => {
    console.error('❌ Database connection failed:', e.message)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })