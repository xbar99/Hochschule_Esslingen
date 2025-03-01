import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const GET = async () => {
  try {
    const statistics = await prisma.statistics.findMany()
    return NextResponse.json(statistics)
  } catch (err) {
    return NextResponse.json(err)
  }
}

export const POST = async (req) => {
  try {
    const {
      totalCalories,
      averageMealRating,
      meatFreeMeals,
      co2Savings,
      mealId,
      userEmail,
    } = await req.json()

    // Überprüfen, ob der Benutzer existiert
    const user = await prisma.users.findUnique({
      where: {
        email: userEmail,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Benutzer nicht gefunden." },
        { status: 404 }
      )
    }

    // Überprüfen, ob die Mahlzeit existiert
    const meal = await prisma.meals.findUnique({
      where: {
        mid: mealId,
      },
    })

    if (!meal) {
      return NextResponse.json(
        { error: "Mahlzeit nicht gefunden." },
        { status: 404 }
      )
    }

    // Statistik erstellen
    const statistic = await prisma.statistics.create({
      data: {
        totalCalories,
        averageMealRating,
        meatFreeMeals,
        co2Savings,
        meal: {
          connect: {
            mid: mealId,
          },
        },
        user: {
          connect: {
            email: userEmail,
          },
        },
      },
    })

    return NextResponse.json({
      message: "Succesfully created statistic",
      statistic,
    })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
