import { HandlerContext, Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req: Request, _ctx: HandlerContext) {
    const url = new URL(req.url);
    const userAgent = req.headers.get("User-Agent");
    if (userAgent?.includes("Safari")) {
      return new Response(
        await Deno.readFile("./static/milky-way.png"),
        {
          headers: {
            "Content-Type": "image/png",
          },
        },
      );
    } else {
      const icon = url.searchParams.get("icon");
      return new Response(
        `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${icon}</text></svg>`,
        {
          headers: {
            "Content-Type": "image/svg+xml",
          },
        },
      );
    }
  },
};
