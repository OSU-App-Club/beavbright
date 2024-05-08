import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Origin = "Discussion" | "Reply";

async function main() {
  const numberOfUsers = 2;
  const discussionsPerUser = 1;
  const repliesPerDiscussion = 5;

  for (let i = 0; i < numberOfUsers; i++) {
    const user = await prisma.user.create({
      data: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        avatar: faker.image.avatar(),
      },
      include: {
        Discussion: true,
        Reply: true,
      },
    });

    for (let j = 0; j < discussionsPerUser; j++) {
      const discussion = await prisma.discussion.create({
        data: {
          title: faker.lorem.sentence(),
          body: faker.lorem.paragraphs(2),
          category: faker.lorem.word(),
          views: faker.number.int(1000),
          replies: faker.number.int(100),
          posterId: user.id,
          createdAt: faker.date.recent(),
        },
        include: {
          poster: true,
        },
      });

      for (let k = 0; k < repliesPerDiscussion; k++) {
        await prisma.reply.create({
          data: {
            poster: {
              connect: {
                id: user.id,
              },
            },
            body: faker.lorem.paragraph(),
            createdAt: faker.date.recent(),
            discussion: {
              connect: {
                id: discussion.id,
              },
            },
          },
          include: {
            poster: true,
            discussion: true,
          },
        });
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });