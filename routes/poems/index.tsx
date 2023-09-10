import { Page } from "../../components/Page.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts, Post } from "../../post.ts";
import AfterHours from "../../islands/AfterHours.tsx";
import NormalHours from "../../islands/NormalHours.tsx";

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
    <>
      <NormalHours>
        <Page title="Night Poems" icon="🔒">
          <div class="my-3">
            <p>Come back after midnight!</p>
          </div>
        </Page>
      </NormalHours>
      <AfterHours>
        <Page title="Night Poems" icon="📝">
          <div class="my-3">{poemNav()}</div>
        </Page>
      </AfterHours>
    </>
  );
}
