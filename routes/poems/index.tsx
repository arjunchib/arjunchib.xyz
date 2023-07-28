import { Page } from "../../components/Page.tsx";
import { isAfterHours } from "../../utils.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts, Post } from "../../post.ts";

type Props = {
  isAfterHours: boolean;
  posts: Post[];
};

export const handler: Handlers<Props> = {
  async GET(_, ctx) {
    const posts = isAfterHours() ? await getPosts("./routes/poems") : [];
    return ctx.render({ isAfterHours: isAfterHours(), posts });
  },
};

export default function Poems(props: PageProps<Props>) {
  const { isAfterHours, posts } = props.data;
  const icon = isAfterHours ? "📝" : "🔒";
  const poems = posts.map((post) => (
    <li>
      <a href={post.slug}>
        <span class="underline">{post.title}</span> {post.emoji}
      </a>
    </li>
  ));

  return (
    <Page title="Night Poems" icon={icon}>
      <nav class="my-3 pl-5">
        {props.data
          ? <ul class="list-disc">{poems}</ul>
          : <p>Come back after midnight!</p>}
      </nav>
    </Page>
  );
}
