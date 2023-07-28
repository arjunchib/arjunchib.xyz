import { Page } from "../../components/Page.tsx";
import { isAfterHours } from "../../utils.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost, Post } from "../../post.ts";
import { render } from "$gfm";

type Props = Post | {
  title: string;
  emoji: string;
};

const headers = { "X-Robots-Tag": "noindex" };

async function getPostOrPartial(slug: string) {
  const post = await getPost("./routes/poems", slug);
  if (!post) return null;
  return isAfterHours() ? post : { title: post.title, emoji: post.emoji };
}

export const handler: Handlers<Props> = {
  async GET(_, ctx) {
    const post = await getPostOrPartial(ctx.params.slug);
    return post ? ctx.render(post, { headers }) : ctx.renderNotFound();
  },
};

export default function Poems(props: PageProps<Props>) {
  const post = props.data;
  if (!("content" in post)) {
    return (
      <Page title={post.title} icon={post.emoji}>
        <p class="my-3">
          Come back after midnight!
        </p>
      </Page>
    );
  }
  const { title, emoji, content } = post;
  return (
    <Page title={title} icon={emoji}>
      <div
        class="mt-4 prose prose-slate prose-invert"
        dangerouslySetInnerHTML={{ __html: render(content) }}
      />
    </Page>
  );
}
