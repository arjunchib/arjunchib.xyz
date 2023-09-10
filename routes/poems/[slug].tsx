import { Page } from "../../components/Page.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost, Post } from "../../post.ts";
import { render } from "$gfm";
import NormalHours from "../../islands/NormalHours.tsx";
import AfterHours from "../../islands/AfterHours.tsx";

const headers = { "X-Robots-Tag": "noindex" };

export const handler: Handlers<Post> = {
  async GET(_, ctx) {
    const post = await getPost("./content/poems", ctx.params.slug);
    return post ? ctx.render(post, { headers }) : ctx.renderNotFound();
  },
};

export default function Poems(props: PageProps<Post>) {
  const { title, emoji, content } = props.data;

  return (
    <Page title={title} icon={emoji}>
      <NormalHours>
        <p class="my-3">
          Come back after midnight!
        </p>
      </NormalHours>
      <AfterHours>
        <div
          class="mt-4 prose prose-slate prose-invert"
          dangerouslySetInnerHTML={{
            __html: render(content, { allowIframes: true }),
          }}
        />
      </AfterHours>
    </Page>
  );
}
