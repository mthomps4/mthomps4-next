const { PrismaClient } = require("@prisma/client");
const { slugify } = require("underscore.string");
const path = require("path");
const { readdir, readFile } = require("fs/promises");

const prisma = new PrismaClient();

const createPosts = async (children, author) => {
  return Promise.all(
    children.map(async (dir) => {
      try {
        const jsonFilePath = path.join(
          __dirname,
          `../public/posts/${dir}/meta.json`
        );
        const jsonData = await readFile(jsonFilePath);
        const metaData = JSON.parse(jsonData);

        const post = await prisma.post.upsert({
          where: { title: metaData.title },
          update: {},
          create: {
            title: metaData.title,
            description: metaData.description,
            publishedOn: new Date(metaData.date),
            slug: slugify(metaData.title),
            coverImage: metaData.coverImage,
            ogImage: metaData.ogImage,
            filePath: metaData.filePath,
            Author: { connect: { id: author.id } },
          },
        });
        return `seeded post: ${post.title}`;
      } catch (e) {
        return `Error creating post: ${dir}: ${e.message}`;
      }
    })
  );
};

async function main() {
  console.log(`Seeding Author...`);
  const author = await prisma.author.upsert({
    where: { email: "matthew.thompson.a@gmail.com" },
    update: {},
    create: {
      firstName: "Matthew",
      lastName: "Thompson",
      email: "matthew.thompson.a@gmail.com",
      twitter: "@mthomps4",
      github: "https://github.com/mthomps4",
      bio: "https://mthomps4.com/about",
    },
  });

  const postPath = path.join(__dirname, "../public/posts/");
  const children = await readdir(postPath);

  const posts = await createPosts(children, author);

  console.log("Seeded Posts: ", posts);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
