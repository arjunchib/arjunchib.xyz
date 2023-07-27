import { Page } from "../../components/Page.tsx";
import { isAfterHours } from "../../utils.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers<boolean> = {
  GET(_, ctx) {
    return ctx.render(isAfterHours());
  },
};

export default function Poems(props: PageProps<boolean>) {
  const icon = props.data ? "📝" : "🔒";
  const poems = <li>Test</li>;

  return (
    <Page title="Night Poems" icon={icon}>
      {props.data ? poems : <p>Come back after midnight!</p>}
    </Page>
  );
}
