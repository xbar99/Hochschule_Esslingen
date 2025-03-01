import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "E-Mail" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials
        const prisma = new PrismaClient()
        const response = await prisma.users.findMany({
          where: {
            email: email,
          },
        })

        const user = response[0]
        const passwordMatch = await bcrypt.compare(password, user.password)

        if (user.email === email && passwordMatch) {
          return user
        } else {
          throw new Error("Invalide credentials")
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
