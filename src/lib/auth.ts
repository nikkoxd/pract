import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import { NextAuthOptions } from "next-auth";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/signin",
    // signOut: "/auth/signout",
    // error: "/auth/error",
    // verifyRequest: "/auth/verify-request",
    newUser: "/auth/signup"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, _req) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email
          }
        });

        if (!user) return null;

        const passwordCorrect = await compare(
          credentials?.password || "",
          user.password
        );
        if (!passwordCorrect) return null;

        return {
          id: user.id,
          email: user.email,
        }
      }
    })
  ]
}
