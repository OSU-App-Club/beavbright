import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Origin = "Discussion" | "Reply";

async function main() {
  const numberOfUsers = 2;
  const discussionsPerUser = 1;
  const repliesPerDiscussion = 5;

  const discrete = await prisma.course.create({
    data: {
      subject: "MTH",
      code: "231",
      title: "Elements of Discrete Mathematics",
    },
  });
  const dataStructures = await prisma.course.create({
    data: {
      subject: "CS",
      code: "161",
      title: "DATA STRUCTURES",
    },
  });
  const webDev = await prisma.course.create({
    data: {
      subject: "CS",
      code: "290",
      title: "Web Development",
    },
  });

  for (let i = 0; i < numberOfUsers; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        image:
          "https://lh3.googleusercontent.com/a/ACg8ocJkHQ6wtbjTPDHKMErXe4KKO332jRZ-KjNoMixsl-QvahhfaCY=s96-c",
        avatar: faker.image.avatar(),
        Course: {
          connect: [discrete, dataStructures, webDev][i % 3],
        },
      },
      include: {
        Discussion: true,
        Reply: true,
        Course: true,
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
