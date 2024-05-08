"use server";

import prisma from "@/app/lib/prisma";
import { compareSync, hashSync } from "bcrypt-ts";
import { revalidatePath } from "next/cache";
import { createSession } from "./session";
import { CreateReplyFields, LoginFields } from "./types";

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
  const discussions = await prisma.discussion.findMany({
    include: {
      poster: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return discussions;
}

export async function getAllDiscussionCategories() {
  const categories = await prisma.discussion.findMany({
    select: {
      category: true,
    },
  });

  const defaultCategories = [
    "General",
    "Computer Science",
    "Study Groups",
    "Math",
    "Physics",
    "Biology",
    "Chemistry",
    "Business",
    "Engineering",
    "Health",
    "Humanities",
    "Social Sciences",
    "Events",
  ];

  const uniqueCategories = Array.from(
    new Set(categories.map((category) => category.category))
  ).filter((category) => category !== "");

  const allCategories = [...defaultCategories, ...uniqueCategories];
  return allCategories;
}

export async function getDiscussionDetails(id: string) {
  const discussion = await prisma.discussion.findUnique({
    where: { id },
    include: {
      poster: true,
    },
  });
  return discussion;
}

export async function getDiscussionReplies(id: string) {
  const replies = await prisma.reply.findMany({
    where: {
      discussionId: id,
    },
    include: {
      poster: true,
      discussion: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  return replies;
}

export async function createNewReply(data: CreateReplyFields) {
  const reply = await prisma.reply.create({
    data: {
      body: data.body,
      discussion: {
        connect: {
          id: data.discussionId,
        },
      },
      poster: {
        connect: {
          id: data.posterId,
        },
      },
    },
    include: {
      poster: true,
      discussion: true,
    },
  });

  await prisma.discussion.update({
    where: { id: data.discussionId },
    data: {
      replies: {
        increment: 1,
      },
    },
  });

  revalidatePath(`/platform/discussions/${data.discussionId}`);
  return reply;
}

// We'll need this for "Reply to a reply" feature (WIP)
export async function createChildReply(data: CreateReplyFields) {
  const reply = await prisma.reply.create({
    data: {
      body: data.body,
      discussion: {
        connect: {
          id: data.discussionId,
        },
      },
      poster: {
        connect: {
          id: data.posterId,
        },
      },
    },
    include: {
      poster: true,
      discussion: true,
    },
  });

  await prisma.discussion.update({
    where: { id: data.discussionId },
    data: {
      replies: {
        increment: 1,
      },
    },
  });

  revalidatePath(`/platform/discussions/${data.discussionId}`);
  return reply;
}

export async function deleteDiscussionReply(id: string) {
  const dicussionId = (await prisma.reply.findUnique({ where: { id } }))
    .discussionId;
  await prisma.reply.delete({ where: { id } });
  await prisma.discussion.update({
    where: { id: dicussionId },
    data: {
      replies: {
        decrement: 1,
      },
    },
  });
  revalidatePath(`/platform/discussions/${dicussionId}`);
}

export async function createNewDiscussion(data: {
  title: string;
  body: string;
  category: string;
  userId: string;
}) {
  const discussion = await prisma.discussion.create({
    data: {
      title: data.title,
      body: data.body,
      category: data.category,
      poster: {
        connect: {
          id: data.userId,
        },
      },
    },
    include: {
      poster: true,
    },
  });
  revalidatePath("/platform/discussions");
  return discussion;
}

export async function deleteDiscussison(id: string) {
  await prisma.discussion.delete({ where: { id } });
  revalidatePath("/platform/discussions");
}

export async function editDiscussion(
  id: string,
  data: { title: string; body: string; category: string }
) {
  await prisma.discussion.update({
    where: { id },
    data: {
      title: data.title,
      body: data.body,
      category: data.category,
    },
  });
  revalidatePath("/platform/discussions");
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  return user;
}

export async function viewDiscussionPost(id: string) {
  await prisma.discussion.update({
    where: { id },
    data: {
      views: {
        increment: 1,
      },
    },
  });
  revalidatePath(`/platform/discussions/${id}`);
}
