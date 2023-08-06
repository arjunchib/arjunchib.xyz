import { Page } from "../../components/Page.tsx";
import { isAfterHours } from "../../utils.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts, Post } from "../../post.ts";

export const handler: Handlers<Post[]> = {
  async GET(_, ctx) {
    return ctx.render(await getPosts("./content/poems"));
  },
};

export default function Poems(props: PageProps<Post[]>) {
  const posts = props.data;

  const poemNav = () => {
    const poems = posts.map((post) => (
      <li>
        <a href={`./poems/${post.slug}`}>
          <span class="underline">{post.title}</span> {post.emoji}
        </a>
      </li>
    ));
    return (
      <nav class="pl-5">
        <ul class="list-disc">{poems}</ul>
      </nav>
    );
  };

  return (
    <Page title="Night Poems" icon={isAfterHours() ? "📝" : "🔒"}>
      <div class="my-3">
        {isAfterHours() ? poemNav() : <p>Come back after midnight!</p>}
      </div>
    </Page>
  );
}
