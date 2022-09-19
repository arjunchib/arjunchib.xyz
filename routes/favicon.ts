import { HandlerContext, Handlers } from "$fresh/server.ts";
import { Image } from "imagescript";

export const handler: Handlers = {
  async GET(req: Request, _ctx: HandlerContext) {
    const url = new URL(req.url);
    const icon = url.searchParams.get("icon");
    const userAgent = req.headers.get("User-Agent");
    const svg =
      `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${icon}</text></svg>`;
    if (userAgent?.includes("Safari")) {
      const image = await Image.renderSVG(svg).encode();
      return new Response(
        image,
        {
          headers: {
            "Content-Type": "image/png",
          },
        },
      );
    } else {
      return new Response(
        svg,
        {
          headers: {
            "Content-Type": "image/svg+xml",
          },
        },
      );
    }
  },
};
