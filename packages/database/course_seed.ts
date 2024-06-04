import { PrismaClient } from "@prisma/client";
import scraper from "./scraper";

const client = new PrismaClient();

const courses = await scraper.getCourses("202403"); // Spring Term
for (const course of courses) {
  await client.course.upsert({
    where: { title: course.title },
    update: {},
    create: {
      title: course.title,
      code: course.code,
      subject: course.subject,
    },
  });
}
