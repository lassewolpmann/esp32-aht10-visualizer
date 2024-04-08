// prisma/seed.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log(`Start seeding ...`)

    const entry = await prisma.tempHumidityData.create({
        data: {
            temp: 0.0,
            humidity: 0.0
        }
    })

    console.log(`Created data entry with id: ${entry.id}`)
    console.log(`Seeding finished.`)
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