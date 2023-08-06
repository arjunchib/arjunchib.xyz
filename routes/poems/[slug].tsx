import { Page } from "../../components/Page.tsx";
import { isAfterHours } from "../../utils.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost, Post } from "../../post.ts";
import { render } from "$gfm";

const headers = { "X-Robots-Tag": "noindex" };

export const handler: Handlers<Post> = {
  async GET(_, ctx) {
    const post = await getPost("./content/poems", ctx.params.slug);
    return post ? ctx.render(post, { headers }) : ctx.renderNotFound();
  },
};

export default function Poems(props: PageProps<Post>) {
  const { title, emoji, content } = props.data;

  const lockedContent = () => (
    <p class="my-3">
      Come back after midnight!
    </p>
  );

  const unlockedContent = () => (
    <div
      class="mt-4 prose prose-slate prose-invert"
      dangerouslySetInnerHTML={{
        __html: render(content, { allowIframes: true }),
      }}
    />
  );

  return (
    <Page title={title} icon={emoji}>
      {isAfterHours() ? unlockedContent() : lockedContent()}
    </Page>
  );
}
