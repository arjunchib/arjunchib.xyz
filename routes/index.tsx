import { Page } from "../components/Page.tsx";
import AfterHours from "../islands/AfterHours.tsx";
import NormalHours from "../islands/NormalHours.tsx";

export default function Home() {
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
            <NormalHours>
              <a href="/poems" title="open after midnight">
                <span class="underline">Night Poems</span> 🔒
              </a>
            </NormalHours>
            <AfterHours>
              <a href="/poems" title="open until 6am">
                <span class="underline">Night Poems</span> 📝
              </a>
            </AfterHours>
          </li>
          <li>
            <a href="/obsidian">
              <span class="underline">Obsidian</span> 🪨
            </a>
          </li>
        </ul>
      </nav>
    </Page>
  );
}
