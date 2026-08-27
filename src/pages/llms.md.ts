import { getLlmsMarkdown } from "llms";

export async function GET() {
  const markdown = await getLlmsMarkdown();

  return new Response(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
    },
  });
}
