import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const GET = async (_, { params }) => {
  try {
    const users = await prisma.users.findMany({
      where: {
        email: params.email,
      },
    })
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json(error)
  }
}
