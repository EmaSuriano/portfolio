import inquirer from "inquirer";
import fs from "fs";

const LINE_SEPARATOR = ",";
const NEW_LINE = "\n";

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function createContent(values) {
  const result = Object.entries(values).map(
    ([key, value]) => `${key}: ${parseValue(value)}`,
  );

  return ["---", ...result, "---", "", "FILL_ME_WITH_CONTENT"].join(NEW_LINE);
}

function parseValue(value) {
  if (!value.includes(LINE_SEPARATOR)) {
    return value;
  }

  return (
    NEW_LINE +
    value
      .split(LINE_SEPARATOR)
      .map((x) => `  - ${x.trim()}`)
      .join(NEW_LINE)
  );
}

const EXTRA_PROMPTS = {
  blog: [
    { type: "input", name: "cover", message: "Enter cover:", required: true },
    {
      type: "input",
      name: "tags",
      message: `Enter tags (using "${LINE_SEPARATOR}"):`,
    },
  ],
  external: [
    { type: "input", name: "external", message: "Enter link:", required: true },
  ],
  til: [
    {
      type: "input",
      name: "tags",
      message: `Enter tags (using "${LINE_SEPARATOR}"):`,
    },
  ],
};

async function main() {
  const { title, type, summary } = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter title:",
      required: true,
    },
    {
      type: "list",
      name: "type",
      message: "Choose a document type:",
      choices: ["til", "blog", "external"],
    },
    {
      type: "input",
      name: "summary",
      message: "Enter summary (optional):",
    },
  ]);

  const extra = await inquirer.prompt(EXTRA_PROMPTS[type]);

  const date = formatDate(new Date());

  const content = createContent({
    publishedAt: date,
    title,
    summary,
    ...extra,
  });

  const filename = `${date}-${title.toLowerCase().replaceAll(" ", "-")}.md`;

  const path = `./src/content/${type}/${filename}`;

  fs.writeFile(path, content, (err) => {
    if (err) throw err;
    console.log(`Article created at ${path}`);
  });
}

main();
