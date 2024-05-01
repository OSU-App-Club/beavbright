import { serve } from "@hono/node-server";
import { PrismaClient, User } from "database";
import { Hono } from "hono";
import { cors } from "hono/cors";

const client = new PrismaClient();
const app = new Hono();

app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", "*"],
  }),
);

app.get("/users", async (c) => {
  const users = await client.user.findMany();
  return c.json(users);
});

serve({ fetch: app.fetch, port: 3001 });
