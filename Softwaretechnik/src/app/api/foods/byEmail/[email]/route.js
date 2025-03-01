import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const GET = async (_, { params }) => {
  try {
    const foods = await prisma.foods.findMany({
      where: {
        email: params.email,
      },
    })
    return NextResponse.json(foods)
  } catch (error) {
    return NextResponse.json(error)
  }
}
export const DELETE = async (_, { params }) => {
  try {
    await prisma.foods.delete({
      where: {
        email: params.email,
      },
    })
    return NextResponse.json({ message: "Succesfully deleted food" })
  } catch (error) {
    return NextResponse.json(error)
  }
}
