import { Page } from "../../components/Page.tsx";
import { isAfterHours } from "../../utils.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost, Post } from "../../post.ts";
import { render } from "$gfm";

type Props = Post | null;
const headers = { "X-Robots-Tag": "noindex" };

export const handler: Handlers<Props> = {
  async GET(_, ctx) {
    if (!isAfterHours()) {
      return ctx.render(null, {
        "status": 403,
        statusText: "Forbidden",
        headers,
      });
    }
    const post = await getPost("./routes/poems", ctx.params.slug);
    return post ? ctx.render(post, { headers }) : ctx.renderNotFound();
  },
};

export default function Poems(props: PageProps<Props>) {
  if (!props.data) {
    return (
      <Page title="Forbidden" icon="🚫">
        <div></div>
      </Page>
    );
  }
  const { title, emoji, content } = props.data;
  return (
    <Page title={title} icon={emoji}>
      <div
        class="mt-4 markdown-body prose prose-slate prose-invert"
        dangerouslySetInnerHTML={{ __html: render(content) }}
      />
    </Page>
  );
}
