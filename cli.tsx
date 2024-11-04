import inquirer from "inquirer";
import fs from "fs";

// Constants
const LINE_SEPARATOR = ",";
const NEW_LINE = "\n";
const ARTICLE_TYPES = ["til", "blog", "external"] as const;

// Type definition
type Prompt = {
  title: string;
  type: (typeof ARTICLE_TYPES)[number];
  summary: string;
};

type Metadata = {
  publishedAt: string;
  title: string;
  summary: string;
};

// Helpers
function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function createContent(values: Metadata) {
  const result = Object.entries(values).map(
    ([key, value]) => `${key}: ${parseValue(value)}`,
  );

  return ["---", ...result, "---", "", "FILL_ME_WITH_CONTENT"].join(NEW_LINE);
}

function parseValue(value: string) {
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

const TAG_PROMPT = {
  type: "input",
  name: "tags",
  message: `Enter tags (using "${LINE_SEPARATOR}"):`,
};

const EXTRA_PROMPTS: Record<Prompt["type"], any> = {
  blog: [
    { type: "input", name: "cover", message: "Enter cover:", required: true },
    TAG_PROMPT,
  ],
  external: [
    { type: "input", name: "external", message: "Enter link:", required: true },
  ],
  til: [TAG_PROMPT],
};

async function main() {
  console.log(
    "✨ Welcome to the best CLI in the world, just follow the steps and start writing!",
  );

  const { type, title, summary } = await inquirer.prompt<Prompt>([
    {
      type: "list",
      name: "type",
      message: "Choose a document type:",
      choices: ARTICLE_TYPES,
    },
    { type: "input", name: "title", message: "Enter title:", required: true },
    { type: "input", name: "summary", message: "Enter summary (optional):" },
  ]);

  const extra = await inquirer.prompt(EXTRA_PROMPTS[type]);

  const date = formatDate(new Date());

  const filename = `${date}-${title.toLowerCase().replaceAll(" ", "-")}.md`;

  const path = `./src/content/${type}/${filename}`;

  const content = createContent({
    publishedAt: date,
    title,
    summary,
    ...extra,
  });

  fs.writeFile(path, content, (err) => {
    if (err) throw err;
    console.log(`Article created at ${path}`);
  });
}

main();
