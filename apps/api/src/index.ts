import { serve } from "@hono/node-server";
import { PrismaClient, User, Course } from "database";
import { Hono } from "hono";
import { cors } from "hono/cors";
import scraper from "./scraper";

const client = new PrismaClient();
const app = new Hono();

app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", "*"],
  })
);

app.get("/users", async (c) => {
  const users = await client.user.findMany();
  return c.json(users);
});

app.post("/scrape", async (c) => {
  const courses = await scraper.getCourses("202403");
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
  return c.json({ message: "Scrape successful", ok: true });
});

serve({ fetch: app.fetch, port: 3001 });
