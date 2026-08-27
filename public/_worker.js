const prefersMarkdown = (accept) => {
  if (!accept) return false;
  return /text\/markdown/i.test(accept) && !/text\/html/i.test(accept);
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

export default {
  async fetch(request, env) {
    const accept = request.headers.get("Accept") || "";

    if (prefersMarkdown(accept)) {
      const markdown = await env.ASSETS.fetch(new URL("/index.md", request.url));
      const headers = new Headers(markdown.headers);
      headers.set("Content-Type", "text/markdown; charset=utf-8");
      headers.set("Vary", "Accept");
      return new Response(markdown.body, {
        status: markdown.status,
        headers,
      });
    }

    return withVaryAccept(await env.ASSETS.fetch(request));
  },
};
