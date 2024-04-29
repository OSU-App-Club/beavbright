"use server";
import prisma from "@/lib/prisma";
import { compareSync, hashSync } from "bcrypt-ts";
import { encrypt } from "./session";
import { cookies } from "next/headers";

type LoginFields = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export async function createUser(data: LoginFields) {
  const { firstName, lastName, email, password } = data;
  const name = `${firstName} ${lastName}`;
  const passwordHash = hashSync(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash,
      avatar: `https://api.dicebear.com/8.x/pixel-art/svg?seed=${name}`,
    },
  });

  return { success: true };
}

export async function authorizeUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("Incorrect email or password");
  }

  if (!compareSync(password, user.password)) {
    throw new Error("Incorrect email or password");
  }

  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ user, expires });

  cookies().set("session", session, { expires, httpOnly: true });

  return { success: true };
}
