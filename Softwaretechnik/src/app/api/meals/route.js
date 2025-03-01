import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const GET = async () => {
  try {
    const meals = await prisma.meals.findMany({
      include: {
        foods: true,
      },
    })
    return NextResponse.json(meals)
  } catch (err) {
    return NextResponse.json(err)
  }
}

export const POST = async (req) => {
  try {
    const { titel, rating, email, foods } = await req.json()

    // Erstelle das neue Meal und die zugehörigen Foods in der Datenbank
    const meal = await prisma.meals.create({
      data: {
        titel,
        rating: rating || 0, // Setze einen Standardwert, falls rating nicht übergeben wird
        user: {
          connect: { email }, // Verbinde das Meal mit dem User über die E-Mail-Adresse
        },
        foods: {
          create: foods.map((food) => ({
            name: food.name,
            calories: food.calories,
            carbohydrates: food.carbohydrates,
            fat: food.fat,
            protein: food.protein,
            containsMeat: food.containsMeat,
            vegetarian: food.vegetarian,
            vegan: food.vegan,
            user: {
              connect: { email }, // Verbinde das Food mit dem User über die E-Mail-Adresse
            },
          })),
        },
      },
      include: {
        foods: true,
      },
    })

    return NextResponse.json({ message: "Successfully created meal", meal })
  } catch (err) {
    console.error("Error creating meal:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

/*
Format vom Post request
{
  {
  "titel": "Hühchen mit Reis",
  "rating": 4,
  "email": "felix.hoffmann@gmail.com",
  "foods": [
    {
      "name": "reis",
      "calories": 130,
      "carbohydrates": 28,
      "fat": 0,
      "protein": 3,
      "containsMeat": false,
      "vegetarian": true,
      "vegan": true
    },
    {
      "name": "Hähnchenbrust",
      "calories": 165,
      "carbohydrates": 0,
      "fat": 4,
      "protein": 31,
      "containsMeat": true,
      "vegetarian": false,
      "vegan": false
    }
  ]
}

*/
