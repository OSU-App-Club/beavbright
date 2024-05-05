"use server";

import prisma from "@/lib/prisma";
import { compareSync, hashSync } from "bcrypt-ts";
import { revalidatePath } from "next/cache";
import { createSession } from "./session";

type LoginFields = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export async function createUser(data: LoginFields) {
  const { firstName, lastName, email, password } = data;
  const passwordHash = hashSync(password, 10);
  const name = `${firstName} ${lastName}`;
  await prisma.user.create({
    data: {
      firstName,
      lastName,
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

  await createSession(user.id);

  return { success: true };
}

export async function getDicussions() {
  const discussions = await prisma.discussions.findMany({
    include: {
      poster: true,
    },
  });
  return discussions;
}

export async function getAllDiscussionCategories() {
  const categories = await prisma.discussions.findMany({
    select: {
      category: true,
    },
  });

  const uniqueCategories = new Set(categories.map((c) => c.category));

  return Array.from(uniqueCategories);
}

export async function getDiscussionDetails(id: string) {
  const discussion = await prisma.discussions.findUnique({
    where: { id },
    include: {
      poster: true,
    },
  });

  return discussion;
}

export async function createNewDiscussion(data: {
  title: string;
  content: string;
  category: string;
  userId: string;
}) {
  const discussion = await prisma.discussions.create({
    data: {
      title: data.title,
      content: data.content,
      category: data.category,
      poster: {
        connect: {
          id: data.userId,
        },
      },
    },
  });
  revalidatePath("/platform/discussions");
  return discussion;
}
