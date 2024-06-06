import { PrismaClient } from "@prisma/client";
import scraper from "./scraper";
import ora from "ora";
const client = new PrismaClient();

const force = process.argv.indexOf("-f") > -1;

async function main() {
  if (!force && (await client.course.count()) > 1000) {
    ora().succeed("Courses already seeded");
    console.log(
      "\nTo force a scrape, use the following command:\npnpm --filter database db:scrape -f\n"
    );
    return;
  }
  const spinner = ora("Fetching courses... This might take a while.").start();

  try {
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
    spinner.succeed("Course data successfully seeded");
  } catch (error) {
    spinner.fail("Failed to seed courses");
    console.error(error);
  }
}

main().finally(() => client.$disconnect());
