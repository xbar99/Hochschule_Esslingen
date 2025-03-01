import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const GET = async (_, { params }) => {
  try {
    const foods = await prisma.foods.findMany({
      where: {
        fid: params.fid,
      },
    })
    return NextResponse.json(foods)
  } catch (error) {
    return NextResponse.json(error)
  }
}

export const PATCH = async (request, { params }) => {
  try {
    const newFoods = await request.json()

    const updatedFoods = await prisma.foods.update({
      where: {
        fid: params.fid,
      },
      data: newFoods,
    })

    return NextResponse.json(updatedFoods)
  } catch (error) {
    return NextResponse.json(error)
  }
}

export const DELETE = async (_, { params }) => {
  try {
    await prisma.foods.delete({
      where: {
        fid: params.fid,
      },
    })
    return NextResponse.json({ message: "Succesfully deleted food" })
  } catch (error) {
    return NextResponse.json(error)
  }
}
