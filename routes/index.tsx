import { Page } from "../components/Page.tsx";
import { isAfterHours } from "../utils.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers<boolean> = {
  GET(_, ctx) {
    return ctx.render(isAfterHours());
  },
};

export default function Home(props: PageProps<boolean>) {
  const poemIcon = props.data ? "📝" : "🔒";
  const poemTitle = props.data ? "open until 6am" : "open after midnight";

  return (
    <Page title="Arjun’s World" icon="🌌" back={false}>
      <nav class="my-3 pl-5">
        <ul class="list-disc">
          <li>
            <a href="/pizza">
              <span class="underline">Pizza</span> 🍕
            </a>
          </li>
          <li>
            <a href="/braves">
              <span class="underline">Braves Radio</span> 📻
            </a>
          </li>
          <li>
            <a href="/poems" title={poemTitle}>
              <span class="underline">Night Poems</span> {poemIcon}
            </a>
          </li>
        </ul>
      </nav>
    </Page>
  );
}
