import { Page } from "../../components/Page.tsx";
import { isAfterHours } from "../../utils.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts, Post } from "../../post.ts";

export const handler: Handlers<Post[]> = {
  async GET(_, ctx) {
    const posts = isAfterHours() ? await getPosts("./content/poems") : [];
    return ctx.render(posts);
  },
};

export default function Poems(props: PageProps<Post[]>) {
  const posts = props.data;
  const icon = posts.length ? "📝" : "🔒";
  const poems = posts.map((post) => (
    <li>
      <a href={`./poems/${post.slug}`}>
        <span class="underline">{post.title}</span> {post.emoji}
      </a>
    </li>
  ));

  const poemNav = () => (
    <nav class="pl-5">
      <ul class="list-disc">{poems}</ul>
    </nav>
  );

  return (
    <Page title="Night Poems" icon={icon}>
      <div class="my-3">
        {poems.length ? poemNav() : <p>Come back after midnight!</p>}
      </div>
    </Page>
  );
}
