import bcrypt from "bcryptjs";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";

const config = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        // runs on login
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          console.log("No user found");
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );
        if (!passwordMatch) {
          console.log("Invalid password");
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized: ({ request }) => {
      // runs on every request with middleware
      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app");

      if (isTryingToAccessApp) {
        return false;
      } else {
        return true;
      }
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn } = NextAuth(config);