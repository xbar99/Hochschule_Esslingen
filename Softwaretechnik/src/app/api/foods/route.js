import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const GET = async () => {
  try {
    const foods = await prisma.foods.findMany()
    return NextResponse.json(foods)
  } catch (err) {
    return NextResponse.json(err)
  }
}

export const POST = async (req) => {
  try {
    const {
      calories,
      carbohydrates,
      email,
      fat,
      containsMeat,
      name,
      protein,
      vegan,
      vegetarian,
      breakfast,
      lunch,
      dinner,
    } = await req.json()

    if (!email) {
      throw new Error("email is required")
    }

    const addFood = await prisma.foods.create({
      data: {
        name,
        calories,
        carbohydrates,
        fat,
        protein,
        containsMeat,
        vegetarian,
        vegan,
        mealid: null,
        email, // Erforderlicher Wert
        breakfast,
        lunch,
        dinner,
      },
    })

    // Erfolgreiche Antwort
    return NextResponse.json({ message: "Successfully created food", addFood })
  } catch (err) {
    console.error("Error creating food:", err)
    return NextResponse.json(
      { error: err.message || "An error occurred" },
      { status: 500 }
    )
  }
}
