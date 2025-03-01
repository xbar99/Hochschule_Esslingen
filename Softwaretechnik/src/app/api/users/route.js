import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const GET = async () => {
  try {
    const users = await prisma.users.findMany()
    return NextResponse.json(users)
  } catch (err) {
    return NextResponse.json(err)
  }
}

export const POST = async (req) => {
  const { firstName, lastName, email, password } = await req.json()
  if (!firstName || !lastName) {
    return NextResponse.error({
      message: "First Name and Last Name are Empty!",
    })
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await prisma.users.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    })
    return NextResponse.json({ message: "Succesfully created data", result })
  } catch (err) {
    return NextResponse.json(err)
  }
}
