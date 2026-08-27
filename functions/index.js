const prefersMarkdown = (accept) => {
  if (!accept) return false;
  const hasMarkdown = /text\/markdown/i.test(accept);
  const hasHtml = /text\/html/i.test(accept);
  return hasMarkdown && !hasHtml;
};

const withVaryAccept = (response) => {
  const headers = new Headers(response.headers);
  const vary = headers.get("Vary");
  if (!vary) {
    headers.set("Vary", "Accept");
  } else if (!/Accept/i.test(vary)) {
    headers.set("Vary", `${vary}, Accept`);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

export async function onRequestGet(context) {
  const accept = context.request.headers.get("Accept") || "";

  if (prefersMarkdown(accept)) {
    const markdownUrl = new URL("/index.md", context.request.url);
    const markdown = await context.env.ASSETS.fetch(markdownUrl);
    const headers = new Headers(markdown.headers);
    headers.set("Content-Type", "text/markdown; charset=utf-8");
    headers.set("Vary", "Accept");
    return new Response(markdown.body, {
      status: markdown.status,
      headers,
    });
  }

  return withVaryAccept(await context.next());
}
