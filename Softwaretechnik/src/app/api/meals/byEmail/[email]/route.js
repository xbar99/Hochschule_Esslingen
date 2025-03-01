import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const GET = async (_, { params }) => {
  try {
    const foods = await prisma.meals.findMany({
      where: {
        email: params.email,
      },
      include: {
        foods: true,
      },
    })
    return NextResponse.json(foods)
  } catch (error) {
    return NextResponse.json(error)
  }
}
