const { mkdir, writeFile } = require("fs/promises");
const { titleize, slugify } = require("underscore.string");
const dayjs = require("dayjs");
const { Command } = require("commander");
const program = new Command();
program.version("0.0.1");

const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

program.option("-n, --name <type>", "Post Name");
program.parse(process.argv);

const options = program.opts();
const { name: postName } = options;

const dateString = dayjs().format("YYYY-MM-DD");

const slugName = slugify(postName);
const foldername = `${dateString}-${slugName}`;
const filename = `${slugName}.md`;
const folderPath = `${__dirname}/public/posts/${foldername}`;
const imagePath = `${folderPath}/images`;
const filePath = `${folderPath}/${filename}`;
const metaFilePath = `${folderPath}/meta.json`;

const title = titleize(postName);

try {
  mkdir(folderPath, { recursive: true });
  mkdir(imagePath, { recursive: true });
  writeFile(filePath, `# ${title}`);
  writeFile(
    metaFilePath,
    `
      {
        "title": "${title}",
        "description": "",
        "date": "${dateString}",
        "tags": [],
        "category": null,
        "filePath": "",
        "ogImage": "",
        "coverImage": ""
      }
  `
  );
} catch (e) {
  console.log("Fail...");
  console.error(e);
}
