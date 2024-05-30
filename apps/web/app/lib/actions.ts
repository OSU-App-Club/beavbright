"use server";

import prisma from "@/app/lib/prisma";
import { compareSync, hashSync } from "bcrypt-ts";
import { revalidatePath } from "next/cache";
import { createSession, updateSession, getSession } from "./session";
import {
  CreateReplyFields,
  LoginFields,
  CourseFields,
  RoomFields,
} from "./types";

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
  const cookiesAccepted = false;
  await createSession(user.id, cookiesAccepted);

  return { success: true };
}

export async function createCourse(data: CourseFields) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const { subject, code, title } = data;
  await prisma.course.create({
    data: {
      subject,
      code,
      title,
    },
  });

  return { success: true };
}

export async function deleteCourse(id: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.course.delete({ where: { id } });
  revalidatePath("/platform/courses");
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
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

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
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

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
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

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
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.discussion.delete({ where: { id } });
  revalidatePath("/platform/discussions");
}

export async function editDiscussion(
  id: string,
  data: { title: string; body: string; category: string }
) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

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

export async function createRoom(data: RoomFields) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const { name, description, courseId, creatorId, subject, code } = data;
  const room = await prisma.room.create({
    data: {
      name,
      description,
      course: {
        connect: {
          id: courseId,
        },
      },
      creator: {
        connect: {
          id: creatorId,
        },
      },
    },
    include: {
      creator: true,
      course: true,
    },
  });

  revalidatePath(`/platform/study-groups/${subject}${code}`);

  return room;
}

export async function deleteRoom(id: string, subject: string, code: number) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.room.delete({ where: { id } });
  revalidatePath(`/platform/study-groups/${subject}${code}`);
}

export async function updateRoom(data: RoomFields, id: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const { name, description, subject, code } = data;

  await prisma.room.update({
    where: { id },
    data: {
      name,
      description,
    },
  });
  revalidatePath(`/platform/study-groups/${subject}${code}`);
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

export async function acceptCookies() {
  await updateSession({ cookiesAccepted: true });
}
