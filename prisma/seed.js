const { PrismaClient } = require("@prisma/client");
const { slugify } = require("underscore.string");
const path = require("path");
const { readdir, readFile } = require("fs/promises");

const prisma = new PrismaClient();

const createPosts = async (postFolders) => {
  return Promise.all(
    postFolders.map(async (dir) => {
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
  const postsPath = path.join(__dirname, "../public/posts/");
  const postFolders = await readdir(postsPath);

  const posts = await createPosts(postFolders);

  console.log("Seeded Posts: ", posts);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
